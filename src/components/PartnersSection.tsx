import { useEffect, useRef, useState } from "react";

export const PartnersSection = () => {
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
      id="partners" 
      className="py-32 relative"
    >
      <div className="container mx-auto px-6">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Partners
            </h2>
            <div className="w-20 h-1 mx-auto mb-8" style={{ background: 'var(--gradient-silver)' }} />
            <p className="text-xl text-muted-foreground font-light">
              Supported by leaders in innovation
            </p>
          </div>

          {/* Partner Logos */}
          <div className="grid md:grid-cols-2 gap-12 items-center justify-items-center">
            {/* Autodesk Foundation */}
            <div className="group relative p-8 rounded-xl bg-card border hover:border-primary/50 transition-all duration-300 w-full max-w-sm">
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: 'hsl(var(--primary))' }}>
                    AUTODESK
                  </div>
                  <div className="text-sm text-muted-foreground uppercase tracking-wider">
                    Foundation
                  </div>
                </div>
              </div>
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: 'var(--shadow-glow)' }}
              />
            </div>

            {/* AT4D */}
            <div className="group relative p-8 rounded-xl bg-card border hover:border-primary/50 transition-all duration-300 w-full max-w-sm">
              <div className="flex items-center justify-center h-32">
                <div className="text-center">
                  <div className="text-4xl font-bold mb-2" style={{ color: 'hsl(var(--primary))' }}>
                    AT4D
                  </div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    Assistive Technologies for Disability
                  </div>
                </div>
              </div>
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: 'var(--shadow-glow)' }}
              />
            </div>
          </div>

          {/* Additional Context */}
          <div className="mt-16 text-center">
            <p className="text-muted-foreground leading-relaxed">
              CoreGuard Mobility is proud to collaborate with organizations dedicated to advancing assistive technology and empowering individuals with disabilities worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
