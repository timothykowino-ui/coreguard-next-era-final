import { useEffect, useRef, useState } from "react";
import carbonFiberBg from "@/assets/carbon-fiber-bg.jpg";

export const StorySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="story" 
      className="py-32 relative overflow-hidden"
    >
      {/* Carbon fiber background with geometric lines */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${carbonFiberBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Intersecting silver geometric lines overlay */}
      <div className="absolute inset-0 opacity-10 geometric-pattern" />

      <div className="container mx-auto px-6 relative z-10">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="heading-font text-5xl md:text-6xl font-bold mb-6 tracking-wide">
              Built from Lived Experience
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ background: 'var(--gradient-silver)' }} />
          </div>

          {/* Story Content */}
          <div className="space-y-8 text-lg leading-relaxed">
            <p className="text-foreground/90">
              CoreGuard Mobility was conceived by a high-risk quadriplegic wheelchair user, whose lived experience defines every design decision. The mission: to minimize secondary injury risks — including fall risk, head and impact injury, pressure injuries, and those caused by lack of posture support.
            </p>

            <p className="text-foreground/90">
              CoreGuard Mobility represents considered, functional, and dignified design — by a wheelchair user, for wheelchair users.
            </p>

            {/* Animated line drawings representation */}
            <div className="my-16 p-12 rounded-xl bg-card/50 border border-primary/20 backdrop-blur-sm relative overflow-hidden">
              {/* Decorative animated lines */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-shimmer" />
              <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-shimmer" style={{ animationDelay: '2s' }} />
              
              <div className="relative">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div className="space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-lg bg-primary/20 border-2 border-primary/50 flex items-center justify-center shadow-lg" style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.4)' }}>
                      <div className="w-8 h-8 border-3 border-primary rounded-full" style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.6))' }} />
                    </div>
                    <p className="text-sm font-semibold text-foreground">Ergonomic<br/>Precision</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-lg bg-primary/20 border-2 border-primary/50 flex items-center justify-center shadow-lg" style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.4)' }}>
                      <div className="w-8 h-8 border-3 border-primary" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.6))' }} />
                    </div>
                    <p className="text-sm font-semibold text-foreground">Human Form<br/>Balance</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-lg bg-primary/20 border-2 border-primary/50 flex items-center justify-center shadow-lg" style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.4)' }}>
                      <div className="w-8 h-8 border-3 border-primary rounded-sm rotate-45" style={{ filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.6))' }} />
                    </div>
                    <p className="text-sm font-semibold text-foreground">Structural<br/>Stability</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-lg bg-primary/20 border-2 border-primary/50 flex items-center justify-center shadow-lg" style={{ boxShadow: '0 0 20px hsl(var(--primary) / 0.4)' }}>
                      <div className="w-8 h-8 border-3 border-primary" style={{ borderRadius: '50% 50% 0 0', filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.6))' }} />
                    </div>
                    <p className="text-sm font-semibold text-foreground">Adaptive<br/>Support</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-xl font-semibold pt-8 text-foreground italic" style={{ textShadow: '0 0 10px hsl(var(--primary) / 0.3)' }}>
              Every contour, every angle — engineered for protection, designed for dignity
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
