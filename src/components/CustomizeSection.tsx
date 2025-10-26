import { useEffect, useRef, useState } from "react";
import { Settings, Sliders, Gauge, Mountain } from "lucide-react";
import { Button } from "./ui/button";

const variants = [
  {
    icon: Settings,
    title: "Manual",
    description: "Precision manual control systems"
  },
  {
    icon: Sliders,
    title: "Powered",
    description: "Advanced motorized assistance"
  },
  {
    icon: Mountain,
    title: "Off-Road",
    description: "All-terrain capability"
  }
];

export const CustomizeSection = () => {
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
      id="customize" 
      className="py-32 relative geometric-pattern"
    >
      <div className="container mx-auto px-6">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Customize Your Device
            </h2>
            <div className="w-20 h-1 mx-auto mb-8" style={{ background: 'var(--gradient-silver)' }} />
            <p className="text-xl text-muted-foreground font-light">
              Tailored to your unique needs
            </p>
          </div>

          {/* Customization Preview */}
          <div className="bg-card border rounded-2xl p-12 mb-12 relative overflow-hidden">
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-primary/20 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-primary/20 rounded-br-2xl" />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <Gauge className="w-16 h-16 mx-auto mb-4 text-primary opacity-70" />
                <h3 className="text-2xl font-light mb-3">User Portal</h3>
                <p className="text-muted-foreground">
                  Soon you'll be able to input your body dimensions and mobility preferences to create your perfect CoreGuard ONE configuration
                </p>
              </div>

              {/* Feature Variants Grid */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                {variants.map((variant, index) => (
                  <div 
                    key={variant.title}
                    className="group p-6 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                      boxShadow: '0 0 0 0 hsl(var(--primary) / 0)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 0 0 0 hsl(var(--primary) / 0)';
                    }}
                  >
                    <variant.icon className="w-10 h-10 mb-4 text-primary group-hover:scale-110 transition-transform duration-300" />
                    <h4 className="text-lg font-medium mb-2">{variant.title}</h4>
                    <p className="text-sm text-muted-foreground">{variant.description}</p>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="text-center mt-12">
                <Button 
                  size="lg"
                  variant="outline"
                  className="group relative overflow-hidden"
                  disabled
                >
                  <span className="relative z-10">Configuration Portal Coming Soon</span>
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{ background: 'var(--gradient-silver)' }}
                  />
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <p className="text-center text-sm text-muted-foreground">
            Each CoreGuard ONE will be precisely configured to match your specific physical requirements and mobility goals
          </p>
        </div>
      </div>
    </section>
  );
};
