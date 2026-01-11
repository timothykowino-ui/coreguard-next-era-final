import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, content-type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SB_SERVICE_ROLE_KEY")!
);

async function logEvent(entry: any) {
  await supabase.from("edge_logs").insert(entry);
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "GET") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    // missing token → token error UX
    if (!token) {
      return Response.redirect("https://coreguardmobility.com/token-expired", 302);
    }

    const { data: subscriber } = await supabase
      .from("subscribers")
      .select("*")
      .eq("unsubscribe_token", token)
      .single();

    // invalid token
    if (!subscriber) {
      await logEvent({
        function_name: "unsubscribe",
        event_type: "invalid_token",
        status: "error",
      });

      return Response.redirect("https://coreguardmobility.com/token-expired", 302);
    }

    // already unsubscribed → success UX
    if (subscriber.unsubscribed) {
      return Response.redirect("https://coreguardmobility.com/unsubscribed", 302);
    }

    // perform unsubscribe
    await supabase
      .from("subscribers")
      .update({
        unsubscribed: true,
        unsubscribed_at: new Date().toISOString(),
        unsubscribe_token: null,
      })
      .eq("id", subscriber.id);

    // best-effort confirmation email
    try {
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": Deno.env.get("BREVO_API_KEY")!,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: [{ email: subscriber.email }],
          subject: "You have been unsubscribed",
          htmlContent: `
            <p>You have successfully unsubscribed from CoreGuard Mobility updates.</p>
            <p>If this was accidental, you can resubscribe on our website.</p>
          `,
        }),
      });
    } catch (_) {}

    await logEvent({
      function_name: "unsubscribe",
      event_type: "unsubscribe",
      email: subscriber.email,
      status: "success",
    });

    return Response.redirect("https://coreguardmobility.com/unsubscribed", 302);

  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500, headers: corsHeaders });
  }
});
