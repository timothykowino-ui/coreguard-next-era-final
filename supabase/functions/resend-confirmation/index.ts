import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { v4 } from "https://deno.land/std/uuid/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SB_SERVICE_ROLE_KEY")!
);

async function logEvent(entry: any) {
  await supabase.from("edge_logs").insert(entry);
}

async function isRateLimited(email: string, fn: string, windowMinutes: number, maxEvents: number) {
  const since = new Date(Date.now() - windowMinutes * 60 * 1000).toISOString();

  const { count } = await supabase
    .from("edge_logs")
    .select("*", { count: "exact", head: true })
    .eq("function_name", fn)
    .eq("email", email)
    .gte("created_at", since);

  return (count ?? 0) >= maxEvents;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405, headers: corsHeaders });

  try {
    const { email } = await req.json();
    const normalized = email?.toLowerCase();

    if (!normalized) {
      return new Response("Email is required", { status: 400, headers: corsHeaders });
    }

    if (await isRateLimited(normalized, "resend-confirmation", 15, 1)) {
      return new Response("Too many requests. Please wait before trying again.", {
        status: 429,
        headers: corsHeaders,
      });
    }

    const { data: subscriber } = await supabase
      .from("subscribers")
      .select("*")
      .eq("email", normalized)
      .single();

    // always respond the same — privacy
    if (!subscriber) {
      return new Response("If this email is registered, a link will be sent.", {
        status: 200,
        headers: corsHeaders,
      });
    }

    // if already confirmed — no resend
    if (subscriber.confirmed) {
      return new Response("Already confirmed.", { status: 200, headers: corsHeaders });
    }

    // unsubscribed cannot re-confirm without resubscribing
    if (subscriber.unsubscribed) {
      return new Response("This email is unsubscribed.", { status: 200, headers: corsHeaders });
    }

    // create new token
    const token = v4.generate();

    await supabase
      .from("subscribers")
      .update({
        confirmation_token: token,
        confirmation_sent_at: new Date().toISOString(),
      })
      .eq("id", subscriber.id);

    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": Deno.env.get("BREVO_API_KEY")!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: [{ email: normalized }],
        subject: "Confirm your subscription",
        htmlContent: `
          <p>Click below to confirm your subscription:</p>
          <p><a href="https://coreguardmobility.com/api/confirm?token=${token}">
            Confirm subscription
          </a></p>
          <p>This link will expire in 48 hours.</p>
        `,
      }),
    });

    await logEvent({
      function_name: "resend-confirmation",
      event_type: "resent",
      email: normalized,
      status: "success",
    });

    return new Response("If this email is registered, a link will be sent.", {
      status: 200,
      headers: corsHeaders,
    });

  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500, headers: corsHeaders });
  }
});
