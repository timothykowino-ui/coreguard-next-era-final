import { Button } from "./ui/button";

export const CTASection = () => {
  const handleSubscribe = () => {
    // Replace this URL with your actual Google Form URL
    window.open('https://forms.gle/YOUR_GOOGLE_FORM_ID', '_blank');
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.1) 0%, transparent 70%)' }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6 animate-fade-in-up">
            Experience the Future of Mobility
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Subscribe to our newsletter for updates, insights, and the latest news from CoreGuard Mobility
          </p>

          <div 
            className="flex justify-center animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <Button 
              onClick={handleSubscribe}
              size="lg"
              className="h-14 px-8 relative overflow-hidden group bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <span className="relative z-10">Subscribe to Newsletter</span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{ background: 'var(--gradient-silver)' }}
              />
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            We collect only your name and email address for newsletter distribution, in compliance with Kenya's Data Protection Act, 2019. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};
