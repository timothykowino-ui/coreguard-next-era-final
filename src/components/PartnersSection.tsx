import { useEffect, useRef, useState } from "react";
import autodeskLogo from "@/assets/autodesk-logo.png";
import at4dLogo from "@/assets/at4d-logo.png";

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
      className="py-32 relative overflow-hidden"
    >
      {/* Abstract geometric mesh background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%),
              linear-gradient(90deg, transparent 49%, hsl(var(--primary) / 0.1) 49%, hsl(var(--primary) / 0.1) 51%, transparent 51%),
              linear-gradient(0deg, transparent 49%, hsl(var(--primary) / 0.1) 49%, hsl(var(--primary) / 0.1) 51%, transparent 51%)
            `,
            backgroundSize: '100% 100%, 100% 100%, 100px 100px, 100px 100px'
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="heading-font text-5xl md:text-6xl font-bold mb-6 tracking-wide">
              Partners
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ background: 'var(--gradient-silver)' }} />
            <p className="text-xl text-primary/80 font-light italic">
              Innovation through collaboration
            </p>
          </div>

          {/* Partner Logos - Silver Monochrome */}
          <div className="grid md:grid-cols-2 gap-12 items-center justify-items-center mb-16">
            {/* Autodesk Foundation */}
            <a 
              href="https://www.autodesk.com/in/sustainability/technology-impact-program"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-10 rounded-xl bg-card/50 border border-primary/20 hover:border-primary/50 transition-all duration-500 w-full backdrop-blur-sm"
            >
              <div className="flex flex-col items-center justify-center min-h-[200px] gap-6">
                <img 
                  src={autodeskLogo} 
                  alt="Autodesk Technology Impact" 
                  className="h-16 mx-auto transition-all duration-500 group-hover:scale-105 opacity-90"
                  style={{ filter: 'brightness(1.2) drop-shadow(0 0 20px hsl(var(--primary) / 0.3))' }}
                />
              </div>
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: 'var(--shadow-glow)' }}
              />
            </a>

            {/* AT4D */}
            <a 
              href="https://at4d.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-10 rounded-xl bg-card/50 border border-primary/20 hover:border-primary/50 transition-all duration-500 w-full backdrop-blur-sm"
            >
              <div className="flex flex-col items-center justify-center min-h-[200px] gap-6">
                <img 
                  src={at4dLogo} 
                  alt="Assistive Technology for Disability Trust" 
                  className="h-20 mx-auto transition-all duration-500 group-hover:scale-105 opacity-90"
                  style={{ filter: 'brightness(1.2) drop-shadow(0 0 20px hsl(var(--primary) / 0.3))' }}
                />
              </div>
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: 'var(--shadow-glow)' }}
              />
            </a>
          </div>

          {/* Additional Context */}
          <div className="text-center">
            <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              CoreGuard Mobility is proud to collaborate with organizations dedicated to advancing assistive technology and empowering individuals with disabilities worldwide.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
