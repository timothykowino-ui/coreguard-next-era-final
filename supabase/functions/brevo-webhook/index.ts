import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

/* ------------------------------------------------------------------ */
/* ENV + CLIENT (FAIL FAST)                                            */
/* ------------------------------------------------------------------ */
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SERVICE_ROLE_KEY = Deno.env.get("SB_SERVICE_ROLE_KEY");
const BREVO_WEBHOOK_SECRET = Deno.env.get("BREVO_WEBHOOK_SECRET");

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || !BREVO_WEBHOOK_SECRET) {
  throw new Error("Missing required environment variables");
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

/* ------------------------------------------------------------------ */
/* CENTRALIZED EDGE LOGGER                                             */
/* ------------------------------------------------------------------ */
async function logEvent(params: {
  function_name: string;
  event_type: string;
  email?: string | null;
  status: "success" | "error";
  message?: unknown;
}) {
  try {
    await supabase.from("edge_logs").insert({
      function_name: params.function_name,
      event_type: params.event_type,
      email: params.email ?? null,
      status: params.status,
      message: params.message ? JSON.stringify(params.message) : null,
    });
  } catch (err) {
    console.error("Edge log failure:", err);
  }
}

/* ------------------------------------------------------------------ */
/* AUTHENTICATION (BREVO SHARED SECRET)                                */
/* ------------------------------------------------------------------ */
function authorize(req: Request): boolean {
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${BREVO_WEBHOOK_SECRET}`;
}

/* ------------------------------------------------------------------ */
/* MAIN HANDLER                                                        */
/* ------------------------------------------------------------------ */
serve(async (req) => {
  /* ---------- METHOD ---------- */
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  /* ---------- AUTH ---------- */
  if (!authorize(req)) {
    await logEvent({
      function_name: "brevo-webhook",
      event_type: "unauthorized",
      status: "error",
    });

    return new Response("Unauthorized", { status: 401 });
  }

  /* ---------- SAFE JSON ---------- */
  let payload: any;
  try {
    payload = await req.json();
  } catch {
    await logEvent({
      function_name: "brevo-webhook",
      event_type: "invalid_json",
      status: "error",
    });

    return new Response("Invalid JSON", { status: 400 });
  }

  /* ---------- NORMALIZATION ---------- */
  const email =
    payload?.email ??
    payload?.event?.email ??
    payload?.data?.email ??
    null;

  const eventType =
    payload?.event ??
    payload?.type ??
    payload?.event_type ??
    "unknown";

  const eventId =
    payload?.event_id ??
    payload?.message_id ??
    payload?.data?.id ??
    crypto.randomUUID();

  /* ---------- IDEMPOTENCY ---------- */
  const { data: existing } = await supabase
    .from("email_events")
    .select("id")
    .eq("external_event_id", eventId)
    .maybeSingle();

  if (existing) {
    return new Response(
      JSON.stringify({ status: "ok", duplicate: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  /* ---------- VALIDATION ---------- */
  if (!email || !eventType) {
    await logEvent({
      function_name: "brevo-webhook",
      event_type: "invalid_payload",
      email,
      status: "error",
      message: payload,
    });

    return new Response("Invalid payload", { status: 400 });
  }

  /* ---------- TEST EVENT ---------- */
  if (eventType === "test_event") {
    await supabase.from("email_events").insert({
      email,
      event_type: "test_event",
      external_event_id: eventId,
      raw: payload,
      is_test: true,
    });

    await logEvent({
      function_name: "brevo-webhook",
      event_type: "test_event",
      email,
      status: "success",
    });

    return new Response(
      JSON.stringify({ status: "ok", test: true }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  /* ---------- AUTO-UNSUBSCRIBE ---------- */
  const unsubscribeEvents = [
    "hard_bounce",
    "blocked",
    "spam",
    "invalid_email",
  ];

  if (unsubscribeEvents.includes(eventType)) {
    await supabase
      .from("subscribers")
      .update({ unsubscribed: true })
      .eq("email", email);
  }

  /* ---------- AUDIT ---------- */
  await supabase.from("email_events").insert({
    email,
    event_type: eventType,
    external_event_id: eventId,
    raw: payload,
    is_test: false,
  });

  await logEvent({
    function_name: "brevo-webhook",
    event_type: eventType,
    email,
    status: "success",
  });

  return new Response(
    JSON.stringify({ status: "ok", event: eventType }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});
