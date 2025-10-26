import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-wheelchair.jpg";
import { ChevronDown } from "lucide-react";

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden geometric-pattern">
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-3xl animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Hero Image - Wheelchair Silhouette */}
          <div className="relative mx-auto mb-12 max-w-4xl animate-fade-in">
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={heroImage} 
                alt="CoreGuard ONE wheelchair silhouette draped in black silk with silver accent lighting"
                className="w-full h-auto object-cover shadow-2xl"
                style={{ boxShadow: 'var(--shadow-elevated)' }}
              />
              {/* Shimmer effect overlay */}
              <div 
                className="absolute inset-0 opacity-30 animate-shimmer"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, hsl(var(--primary) / 0.3) 50%, transparent 100%)',
                  backgroundSize: '200% 100%'
                }}
              />
            </div>
            
            {/* Floating accent lines */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t-2 border-l-2 opacity-50 animate-float" style={{ borderColor: 'hsl(var(--primary))' }} />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-2 border-r-2 opacity-50 animate-float" style={{ borderColor: 'hsl(var(--primary))', animationDelay: '3s' }} />
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-tight animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Introducing{" "}
            <span 
              className="font-semibold bg-clip-text text-transparent"
              style={{ 
                backgroundImage: 'var(--gradient-silver)',
                textShadow: 'var(--glow-silver)'
              }}
            >
              CoreGuard ONE
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-muted-foreground mb-4 font-light animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            Engineered from Experience
          </p>

          {/* Coming Soon Badge */}
          <div className="inline-block animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <div className="relative">
              <div 
                className="absolute inset-0 rounded-full blur-md opacity-50"
                style={{ background: 'var(--gradient-silver)' }}
              />
              <span className="relative px-8 py-3 bg-card border text-sm font-medium tracking-wider uppercase inline-block rounded-full">
                Coming Soon
              </span>
            </div>
          </div>

          {/* Subtitle */}
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            The first iteration of a next-generation mobility system designed by and for wheelchair users
          </p>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <ChevronDown className="w-8 h-8 text-muted-foreground opacity-50" />
        </div>
      </div>
    </section>
  );
};
