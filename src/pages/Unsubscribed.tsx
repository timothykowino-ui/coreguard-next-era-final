import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

export default function Unsubscribed() {
  return (
    <>
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 w-full z-50 border-b bg-background/95 backdrop-blur px-6 py-4 flex justify-between items-center shadow-sm">
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
          ← Back to Home
        </Link>
      </div>

      <main className="pt-24 relative overflow-hidden">
        {/* Subtle radial background glow */}
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            background:
              "radial-gradient(circle at center, hsl(var(--destructive) / 0.25), transparent 70%)",
          }}
        />

        <section className="py-28 px-6">
          <div className="max-w-2xl mx-auto text-center">

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              You’ve been unsubscribed
            </h1>

            <p className="text-muted-foreground mb-4">
              You won’t receive further email updates from CoreGuard Mobility.
            </p>

            <p className="text-muted-foreground">
              Thank you for being part of the journey — you’re welcome back
              anytime.
            </p>

            <div className="mt-10 flex justify-center gap-4">
              <Link
                to="/subscribe"
                className="rounded-2xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Re-subscribe
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
