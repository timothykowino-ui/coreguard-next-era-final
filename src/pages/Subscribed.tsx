import { Link } from "react-router-dom";
import { Footer } from "@/components/Footer";

export default function Subscribed() {
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
          ← Back to Home
        </Link>
      </div>

      <main className="pt-20 relative overflow-hidden">
        {/* soft radial background */}
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
              You’re all set 🎉
            </h1>

            <p className="text-muted-foreground mb-10">
              Your subscription is confirmed. Welcome to the CoreGuard Mobility
              community. We’ll occasionally share thoughtful updates on mobility
              innovation, accessibility, and community stories — never spam.
            </p>

            <div className="rounded-2xl border bg-background p-8">
              <h2 className="text-2xl font-semibold mb-2">
                You’re now subscribed
              </h2>

              <p className="text-muted-foreground">
                You’ll start receiving updates soon. You can unsubscribe at any
                time using the link included in every email.
              </p>
            </div>

            <div className="mt-10 flex justify-center">
              <Link
                to="/"
                className="rounded-2xl bg-primary px-6 py-3 font-semibold text-primary-foreground hover:opacity-90"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
