import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import wheelchairPlatform from "@/assets/wheelchair-platform-back.png";

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
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
          {/* Static Platform with Draped Wheelchair */}
          <div className="relative mx-auto mb-16 max-w-3xl mt-24">
            {/* Platform base with silver underlighting */}
            <div className="relative">
              <div 
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%] h-4 rounded-full opacity-60 blur-xl"
                style={{ 
                  background: 'radial-gradient(ellipse, hsl(var(--primary)) 0%, transparent 70%)',
                  boxShadow: '0 0 40px hsl(var(--primary) / 0.5)'
                }}
              />
              
              {/* Static image with seamless background blend */}
              <div className="relative mx-auto">
                <img 
                  src={wheelchairPlatform} 
                  alt="CoreGuard Mobility luxury wheelchair on rotating platform with shield emblem"
                  className="w-full h-auto max-w-3xl object-contain mx-auto"
                  style={{ 
                    filter: 'drop-shadow(0 0 30px hsl(var(--primary) / 0.4))',
                    mixBlendMode: 'screen'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="heading-font text-5xl md:text-7xl font-bold mb-6 tracking-wide animate-fade-in-up text-white" style={{ animationDelay: '0.3s' }}>
            Introducing{" "}
            <span 
              className="bg-clip-text text-transparent"
              style={{ 
                backgroundImage: 'var(--gradient-silver)',
                textShadow: '0 0 40px hsl(var(--primary) / 0.5)'
              }}
            >
              CoreGuard Mobility
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl mb-2 font-light animate-fade-in-up tracking-wide text-white/90" style={{ animationDelay: '0.5s' }}>
            Coming Soon
          </p>

          <p className="text-lg md:text-xl mb-8 font-light italic animate-fade-in-up text-white/80" style={{ animationDelay: '0.6s' }}>
            Engineered from lived experience. Designed for dignity.
          </p>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <ChevronDown className="w-8 h-8 text-primary/50" />
        </div>
      </div>
    </section>
  );
};
