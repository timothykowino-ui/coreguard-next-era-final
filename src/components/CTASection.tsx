import React from "react";

export const CTASection = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at center, hsl(var(--primary) / 0.1) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6 animate-fade-in-up">
            Experience the Future of Mobility
          </h2>

          <p
            className="text-xl text-muted-foreground mb-12 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Subscribe to our newsletter for updates, insights, and the latest
            news from CoreGuard Mobility
          </p>

          <div
            className="flex justify-center animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <a
              href="/subscribe.html"
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Subscribe
            </a>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            We collect only your name and email address for newsletter
            distribution, in compliance with Kenya&apos;s Data Protection Act,
            2019. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};
