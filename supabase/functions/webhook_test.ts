export async function POST(req: Request) {
  const payload = await req.json();
  console.log("Webhook received:", payload);
  // Insert into your audit table
  const { data, error } = await supabase
    .from("webhook_audit")
    .insert([{ event: payload.event, raw_payload: JSON.stringify(payload), status: "test" }]);
  if (error) return new Response("Error logging webhook", { status: 500 });
  return new Response("Webhook test successful", { status: 200 });
}
