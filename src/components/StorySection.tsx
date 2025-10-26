import { useEffect, useRef, useState } from "react";
import { Shield, Users, Zap, Heart } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Safety & Stability",
    description: "Advanced impact absorption and stability control systems"
  },
  {
    icon: Users,
    title: "Ergonomic Control",
    description: "Precision posture management for optimal comfort"
  },
  {
    icon: Zap,
    title: "Pressure Prevention",
    description: "Medical-grade design to prevent pressure injuries"
  },
  {
    icon: Heart,
    title: "User Dignity",
    description: "Empowering independence and confidence"
  }
];

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
      {/* Background accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-30" />

      <div className="container mx-auto px-6">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-6">
              Our Story
            </h2>
            <div className="w-20 h-1 mx-auto mb-8" style={{ background: 'var(--gradient-silver)' }} />
          </div>

          {/* Story Content */}
          <div className="space-y-8 text-lg leading-relaxed text-foreground/90">
            <p className="text-center text-xl text-muted-foreground font-light italic">
              Built from lived experience
            </p>

            <p>
              CoreGuard Mobility was founded by a wheelchair user who understood firsthand the critical gaps in current mobility solutions. For individuals with quadriplegia and compromised core control, existing wheelchairs fail to address fundamental safety and comfort needs.
            </p>

            <p>
              CoreGuard ONE represents a paradigm shift—a mobility system engineered from the ground up to redefine what wheelchair users should expect from their equipment. Every design decision stems from real-world experience and a deep understanding of high-risk user needs.
            </p>

            <div className="bg-card border rounded-xl p-8 my-12">
              <h3 className="text-2xl font-light mb-6 text-center">Key Innovations</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <div 
                    key={feature.title}
                    className="flex items-start gap-4 p-4 rounded-lg transition-all duration-300 hover:bg-secondary/30"
                    style={{
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-primary/10 border border-primary/20">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-center text-lg font-light pt-8">
              This is more than a product. This is a movement to restore dignity, safety, and independence to those who need it most.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
