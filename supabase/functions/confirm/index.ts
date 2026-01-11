import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ---------- UX ROUTES ----------
const UX = {
  success: "https://coreguardmobility.com/subscribed",
  expired: "https://coreguardmobility.com/token-expired",
  error: "https://coreguardmobility.com/error",
};

// ---------- SUPABASE ----------
const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SB_SERVICE_ROLE_KEY")!
);

// ---------- LOGGING ----------
async function logEvent(entry: Record<string, any>) {
  try {
    await supabase.from("edge_logs").insert(entry);
  } catch {
    // never block UX
  }
}

// ---------- SERVER ----------
serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok");
  if (req.method !== "GET") return new Response("Method Not Allowed", { status: 405 });

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return Response.redirect(UX.expired, 302);
    }

    const { data: subscriber } = await supabase
      .from("subscribers")
      .select("*")
      .eq("confirmation_token", token)
      .maybeSingle();

    if (!subscriber) {
      await logEvent({ function_name: "confirm", event_type: "invalid_token" });
      return Response.redirect(UX.expired, 302);
    }

    if (subscriber.confirmed) {
      return Response.redirect(UX.success, 302);
    }

    if (subscriber.confirmation_sent_at) {
      const expired =
        Date.now() - new Date(subscriber.confirmation_sent_at).getTime() >
        48 * 60 * 60 * 1000;

      if (expired) {
        await logEvent({
          function_name: "confirm",
          event_type: "token_expired",
          email: subscriber.email,
        });
        return Response.redirect(UX.expired, 302);
      }
    }

    await supabase
      .from("subscribers")
      .update({
        confirmed: true,
        confirmed_at: new Date().toISOString(),
        confirmation_token: null,
      })
      .eq("id", subscriber.id);

    // non-blocking welcome email
    fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": Deno.env.get("BREVO_API_KEY")!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          email: "subscribe@news.coreguardmobility.com",
          name: "CoreGuard Mobility",
        },
        to: [{ email: subscriber.email }],
        subject: "Welcome to CoreGuard Mobility",
        htmlContent: `
          <h2>Welcome aboard!</h2>
          <p>Your subscription is confirmed.</p>
        `,
      }),
    }).catch(() => {});

    await logEvent({
      function_name: "confirm",
      event_type: "confirmed",
      email: subscriber.email,
    });

    return Response.redirect(UX.success, 302);
  } catch (err) {
    console.error(err);
    return Response.redirect(UX.error, 302);
  }
});
