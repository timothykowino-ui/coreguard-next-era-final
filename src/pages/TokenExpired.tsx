import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

export default function TokenExpired() {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 border-b bg-background px-6 py-4 flex justify-between items-center shadow-sm">
        <Link to="/" className="text-lg font-semibold tracking-tight hover:underline">
          CoreGuard Mobility
        </Link>

        <Link to="/" className="text-sm text-muted-foreground hover:text-primary underline">
          ← Back to Home
        </Link>
      </div>

      <main className="pt-20 relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            background:
              "radial-gradient(circle at center, hsl(var(--destructive) / 0.35), transparent 70%)",
          }}
        />

        <section className="py-32 px-6">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Link expired or invalid
            </h1>

            <p className="text-muted-foreground mb-6">
              Your confirmation or unsubscribe link is no longer valid. This usually happens if it
              has already been used or expired.
            </p>

            <div className="rounded-2xl border bg-background p-8">
              <p className="text-muted-foreground mb-4">
                You can request a fresh confirmation email below.
              </p>

              <Link
                to="/subscribe"
                className="rounded-2xl bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
              >
                Request new link
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
