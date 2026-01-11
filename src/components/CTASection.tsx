import React from "react";
import { useNavigate } from "react-router-dom";

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-28 px-6 text-center relative overflow-hidden bg-background">
      {/* Soft radial glow background for cohesion with subscribe.tsx */}
      <div
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          background:
            "radial-gradient(circle at center, hsl(var(--primary) / 0.35), transparent 70%)",
        }}
      />

      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Join the CoreGuard Mobility Community
        </h2>

        <p className="text-muted-foreground mb-10">
          Be the first to receive thoughtful updates on mobility innovation,
          assistive technology, community stories, and opportunities to engage.
          No spam. Just value for people who care about accessibility and
          independence.
        </p>

        <button
          onClick={() => navigate("/subscribe")}
          className="w-full max-w-sm mx-auto rounded-2xl bg-primary px-6 py-4 font-semibold text-primary-foreground shadow-lg hover:opacity-90 transition disabled:opacity-60"
        >
          Subscribe to Our Newsletter
        </button>

        <p className="text-xs text-muted-foreground mt-4">
          You can unsubscribe anytime with a single click.
        </p>
      </div>
    </section>
  );
};
