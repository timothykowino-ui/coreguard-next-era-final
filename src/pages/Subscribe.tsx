import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

const SUPABASE_FUNCTION_URL =
  "https://rmhshifugmyqynpnhecr.supabase.co/functions/v1/subscribe";

export default function Subscribe() {
  const [status, setStatus] =
    useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      email: String(formData.get("email") || "").trim(),
      full_name: String(formData.get("firstName") || "").trim(),
      consent: formData.get("consent") === "on",
      source: "website_subscribe",
    };

    if (!payload.email) {
      setError("Email address is required");
      setStatus("error");
      return;
    }

    try {
      const res = await fetch(SUPABASE_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Subscription failed");
      }

      // Optional: read response (even if you don’t use it)
      await res.text();

      setStatus("success");
      form.reset();
    } catch (err: any) {
      console.error("Subscribe error:", err);
      setError(err?.message || "Something went wrong");
      setStatus("error");
    }
  }

  return (
    <>
      {/* Floating local header */}
      <div className="fixed top-0 left-0 w-full z-50 border-b bg-background px-6 py-4 flex justify-between items-center shadow-sm">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight hover:underline"
        >
          CoreGuard Mobility
        </Link>
        <Link
          to="/"
          className="text-sm text-muted-foreground hover:text-primary underline"
        >
          ← Back
        </Link>
      </div>

      <main className="pt-20 relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            background:
              "radial-gradient(circle at center, hsl(var(--primary) / 0.35), transparent 70%)",
          }}
        />

        <section className="py-32 px-6">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Stay Connected
            </h1>

            <p className="text-muted-foreground mb-12">
              Receive thoughtful updates on mobility innovation.
            </p>

            {status === "success" ? (
              <div className="rounded-2xl border bg-background p-8">
                <h2 className="text-2xl font-semibold mb-2">
                  You’re almost in
                </h2>
                <p className="text-muted-foreground">
                  Please check your inbox to confirm your subscription.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email address"
                  className="w-full rounded-2xl border px-4 py-3"
                />

                <input
                  type="text"
                  name="firstName"
                  placeholder="First name (optional)"
                  className="w-full rounded-2xl border px-4 py-3"
                />

                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input type="checkbox" name="consent" required />
                  <span>
                    I agree to receive email updates in line with the{" "}
                    <Link
                      to="/privacy"
                      className="underline hover:text-primary"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>

                {status === "error" && (
                  <p className="text-sm text-red-600">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-2xl bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
                >
                  {status === "loading" ? "Submitting…" : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
