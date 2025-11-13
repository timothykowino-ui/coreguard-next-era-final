import { useEffect, useRef, useState } from "react";
import { Shield, User, Activity, Heart } from "lucide-react";
import carbonFiberBg from "@/assets/carbon-fiber-bg.jpg";

const features = [
  {
    icon: Shield,
    title: "Safety & Stability",
    description: "Mechanical balance and fall prevention systems engineered for maximum protection"
  },
  {
    icon: User,
    title: "Ergonomic Posture Support",
    description: "Adaptive spinal and headrest systems that respond to individual body needs"
  },
  {
    icon: Activity,
    title: "Impact & Pressure Management",
    description: "Advanced materials that distribute load evenly to prevent secondary injuries"
  },
  {
    icon: Heart,
    title: "User Dignity through Design",
    description: "Discreet functionality without bulk."
  }
];

export const StorySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
              CoreGuard Mobility was conceived by a quadriplegic wheelchair user, whose lived experience defines every design decision. The mission: to minimize secondary injury risks — including fall risk, head and impact injury, pressure injuries, and those caused by lack of posture support.
            </p>

            <p className="text-foreground/90">
              CoreGuard Mobility represents considered, functional, and dignified design — by a wheelchair user, for wheelchair users.
            </p>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-8 mt-16">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="group relative p-8 rounded-xl bg-card/50 border border-border/30 backdrop-blur-sm transition-all duration-500 hover:border-primary/50"
                  style={{
                    animationDelay: `${index * 0.15}s`,
                    boxShadow: hoveredIndex === index ? 'var(--shadow-glow)' : 'none'
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Animated corner accents */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-primary/0 group-hover:border-primary/50 transition-all duration-500 rounded-tl-xl" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-primary/0 group-hover:border-primary/50 transition-all duration-500 rounded-br-xl" />

                  <div className="relative z-10">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div 
                          className="w-16 h-16 rounded-lg flex items-center justify-center bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-all duration-500"
                          style={{
                            boxShadow: hoveredIndex === index ? '0 0 20px hsl(var(--primary) / 0.3)' : 'none'
                          }}
                        >
                          <feature.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-500" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="heading-font text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom tagline */}
            <div className="mt-16 text-center">
              <p className="text-lg text-muted-foreground italic">
                Precision engineering meets human-centered innovation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
