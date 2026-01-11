import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ---------- CORS ----------
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ---------- UTIL ----------
function generateToken() {
  return crypto.randomUUID() + crypto.randomUUID();
}

// ---------- SERVER ----------
serve(async (req) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders,
    });
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SB_SERVICE_ROLE_KEY")!
  );

  try {
    const { full_name, email, consent, source } = await req.json();

    if (!email || consent !== true) {
      return new Response(
        JSON.stringify({ error: "Invalid submission" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // ---------- RATE LIMIT ----------
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const now = new Date();

    const { data: rl } = await supabase
      .from("rate_limits")
      .select("*")
      .eq("ip", ip)
      .maybeSingle();

    const windowMinutes = 10;
    const limit = 5;

    if (!rl) {
      await supabase.from("rate_limits").insert({
        ip,
        count: 1,
        last_request: now.toISOString(),
      });
    } else {
      const last = new Date(rl.last_request);
      const minutes = (now.getTime() - last.getTime()) / 60000;

      if (minutes > windowMinutes) {
        await supabase
          .from("rate_limits")
          .update({ count: 1, last_request: now.toISOString() })
          .eq("ip", ip);
      } else if (rl.count >= limit) {
        return new Response(
          JSON.stringify({ error: "Too many requests" }),
          { status: 429, headers: corsHeaders }
        );
      } else {
        await supabase
          .from("rate_limits")
          .update({
            count: rl.count + 1,
            last_request: now.toISOString(),
          })
          .eq("ip", ip);
      }
    }

    // ---------- TOKENS ----------
    const confirmationToken = generateToken();
    const unsubscribeToken = crypto.randomUUID();

    const confirmUrl =
      `https://rmhshifugmyqynpnhecr.supabase.co/functions/v1/confirm?token=${confirmationToken}`;

    // ---------- UPSERT ----------
    const { error: dbError } = await supabase
      .from("subscribers")
      .upsert(
        {
          email,
          full_name: full_name || null,
          consent: true,
          confirmed: false,
          confirmation_token: confirmationToken,
          confirmation_sent_at: now.toISOString(),
          unsubscribe_token: unsubscribeToken,
          source: source || "subscribe_page",
        },
        { onConflict: "email" }
      );

    if (dbError) {
      console.error("DB error:", dbError);
      return new Response(
        JSON.stringify({ error: "Database error" }),
        { status: 500, headers: corsHeaders }
      );
    }

    // ---------- BREVO KEY DIAGNOSTIC (TEMPORARY) ----------
    const brevoKey = Deno.env.get("BREVO_API_KEY");

    console.log(
      "BREVO KEY CHECK:",
      brevoKey ? brevoKey.slice(0, 6) : "MISSING",
      brevoKey ? brevoKey.length : "NO_LENGTH"
    );

    if (!brevoKey) {
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: corsHeaders }
      );
    }

    // ---------- EMAIL ----------
    const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": brevoKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          email: "subscribe@news.coreguardmobility.com",
          name: "CoreGuard Mobility",
        },
        to: [{ email }],
        subject: "Confirm your CoreGuard Mobility subscription",
        htmlContent: `
<p>Hello${full_name ? " " + full_name : ""},</p>
<p>Thank you for subscribing to CoreGuard Mobility.</p>
<p>Please confirm your subscription by clicking below:</p>
<p><a href="${confirmUrl}">Confirm subscription</a></p>
<p>If you did not request this, you can ignore this email.</p>
        `.trim(),
      }),
    });

    if (!emailRes.ok) {
      const errorText = await emailRes.text();
      console.error("Brevo API error:", errorText);

      return new Response(
        JSON.stringify({
          error: "Email delivery failed",
          brevo: errorText,
        }),
        { status: 502, headers: corsHeaders }
      );
    }

    // ---------- SUCCESS ----------
    return new Response(
      JSON.stringify({
        message: "Subscription received. Please check your inbox.",
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error("Unhandled error:", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500, headers: corsHeaders }
    );
  }
});
