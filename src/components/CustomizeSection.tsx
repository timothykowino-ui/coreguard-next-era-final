import { useEffect, useRef, useState } from "react";
import { Settings, Zap, Mountain } from "lucide-react";

const models = [
  {
    icon: Settings,
    name: "CoreGuard ONE",
    subtitle: "Manual Variant",
    features: ["Precision Control", "Lightweight Frame", "Ergonomic Design"]
  },
  {
    icon: Zap,
    name: "CoreGuard TWO",
    subtitle: "Powered Variant",
    features: ["Electric Assist", "Adaptive Suspension", "Smart Controls"]
  },
  {
    icon: Mountain,
    name: "CoreGuard THREE MG",
    subtitle: "Powered Off-Road Variant",
    features: ["All-Terrain Wheels", "Enhanced Suspension", "Off-Road Mobility"]
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
      className="py-32 relative overflow-hidden"
    >
      {/* Subtle geometric pattern background */}
      <div className="absolute inset-0 opacity-5 geometric-pattern" />

      <div className="container mx-auto px-6 relative z-10">
        <div className={`max-w-6xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="heading-font text-5xl md:text-6xl font-bold mb-6 tracking-wide">
              Customization
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ background: 'var(--gradient-silver)' }} />
            <p className="text-xl text-primary/80 font-light italic">
              Every body is different. Every CoreGuard adapts.
            </p>
          </div>

          {/* Intro text */}
          <p className="text-center text-lg text-muted-foreground mb-16 max-w-3xl mx-auto">
            An interactive concept area where users will soon input body dimensions and select preferred design features.
          </p>

          {/* Three Model Silhouettes */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {models.map((model, index) => (
              <div 
                key={model.name}
                className="group relative"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Sweeping light effect container */}
                <div className="relative bg-card/50 border border-primary/20 rounded-2xl p-8 overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-primary/50">
                  {/* Animated sweeping light */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: 'linear-gradient(135deg, transparent 0%, hsl(var(--primary) / 0.2) 50%, transparent 100%)',
                      animation: 'shimmer 3s linear infinite',
                      animationPlayState: 'paused'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.animationPlayState = 'running';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.animationPlayState = 'paused';
                    }}
                  />

                  <div className="relative z-10">
                    {/* Icon silhouette */}
                    <div className="w-20 h-20 mx-auto mb-6 rounded-lg bg-primary/10 border-2 border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-500">
                      <model.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500" />
                    </div>

                    {/* Model name */}
                    <h3 className="heading-font text-2xl font-bold mb-2 text-center">
                      {model.name}
                    </h3>
                    <p className="text-sm text-muted-foreground text-center mb-6 italic">
                      {model.subtitle}
                    </p>

                    {/* Features that fade in on hover */}
                    <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                      {model.features.map((feature, idx) => (
                        <div 
                          key={idx}
                          className="text-sm text-primary/70 text-center px-3 py-1 rounded bg-primary/5 border border-primary/10"
                        >
                          {feature}
                        </div>
                      ))}
                    </div>

                    {/* Placeholder text when not hovering */}
                    <div className="text-center text-xs text-muted-foreground/50 mt-4 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                      Hover to reveal specs
                    </div>
                  </div>

                  {/* Corner decorations */}
                  <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-primary/0 group-hover:border-primary/40 transition-all duration-500 rounded-tl-2xl" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-primary/0 group-hover:border-primary/40 transition-all duration-500 rounded-br-2xl" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom tagline */}
          <div className="text-center space-y-6">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each CoreGuard model will be precisely configured to match your specific physical requirements and mobility goals through our upcoming user customization portal.
            </p>
            
            <div className="inline-block relative">
              <div 
                className="absolute inset-0 blur-lg opacity-30"
                style={{ background: 'var(--gradient-silver)' }}
              />
              <p className="relative text-sm text-primary/60 italic">
                Configuration portal launching soon
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
