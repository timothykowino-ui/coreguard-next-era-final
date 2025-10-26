import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import kenyanEmblem from "@/assets/kenyan-emblem.png";

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    // Rotating platform animation
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.1) % 360);
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-15 blur-3xl animate-glow-pulse"
          style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {/* Rotating Platform with Draped Wheelchair */}
          <div className="relative mx-auto mb-16 max-w-3xl">
            {/* Platform base with silver underlighting */}
            <div className="relative">
              <div 
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-4 rounded-full opacity-60 blur-xl"
                style={{ 
                  background: 'radial-gradient(ellipse, hsl(var(--primary)) 0%, transparent 70%)',
                  boxShadow: '0 0 40px hsl(var(--primary) / 0.5)'
                }}
              />
              
              {/* Rotating platform */}
              <div 
                className="relative mx-auto"
                style={{
                  transform: `perspective(1000px) rotateY(${rotation}deg)`,
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.03s linear'
                }}
              >
                {/* Silk drape with wheelchair silhouette */}
                <div className="relative bg-gradient-to-b from-card/80 to-card rounded-2xl p-12 border border-primary/20 backdrop-blur-sm">
                  {/* Front view - crescent headrest silhouette */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center opacity-100"
                    style={{
                      transform: `rotateY(${-rotation}deg)`,
                      backfaceVisibility: rotation > 90 && rotation < 270 ? 'hidden' : 'visible'
                    }}
                  >
                    <div className="w-32 h-48 border-4 border-primary/30 rounded-t-full" />
                  </div>
                  
                  {/* Back view - Kenyan emblem */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transform: `rotateY(${180 - rotation}deg)`,
                      backfaceVisibility: rotation > 90 && rotation < 270 ? 'visible' : 'hidden'
                    }}
                  >
                    <img 
                      src={kenyanEmblem} 
                      alt="Kenyan shield and crossed spears emblem"
                      className="w-64 h-64 object-contain opacity-80"
                      style={{ filter: 'drop-shadow(0 0 20px hsl(var(--primary) / 0.5))' }}
                    />
                  </div>
                  
                  <div className="h-64" />
                </div>

                {/* Sweeping light effect */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `linear-gradient(${rotation}deg, transparent 0%, hsl(var(--primary) / 0.2) 50%, transparent 100%)`,
                    animation: 'shimmer 4s linear infinite'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="heading-font text-5xl md:text-7xl font-bold mb-6 tracking-wide animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            Introducing{" "}
            <span 
              className="bg-clip-text text-transparent"
              style={{ 
                backgroundImage: 'var(--gradient-silver)',
                textShadow: '0 0 40px hsl(var(--primary) / 0.5)'
              }}
            >
              CoreGuard ONE
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-2 font-light animate-fade-in-up tracking-wide" style={{ animationDelay: '0.5s' }}>
            Coming Soon
          </p>

          <p className="text-lg md:text-xl text-primary/80 mb-8 font-light italic animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            Engineered from lived experience. Designed for dignity.
          </p>

          {/* CTA Button */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Button 
              size="lg"
              className="heading-font px-10 py-6 text-base tracking-widest uppercase bg-primary/10 border-2 border-primary hover:bg-primary/20 hover:border-primary/80 transition-all duration-500 group relative overflow-hidden"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="relative z-10">Join the Waitlist</span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'var(--gradient-silver)', mixBlendMode: 'overlay' }}
              />
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <ChevronDown className="w-8 h-8 text-primary/50" />
        </div>
      </div>
    </section>
  );
};
