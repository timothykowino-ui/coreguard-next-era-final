import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export const CTASection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for your interest! We'll notify you when CoreGuard ONE launches.", {
        description: "Stay tuned for updates on the future of mobility."
      });
      setEmail("");
    }
  };

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{ background: 'radial-gradient(circle at center, hsl(var(--primary) / 0.1) 0%, transparent 70%)' }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light mb-6 animate-fade-in-up">
            Experience the Future of Mobility
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Sign up for launch updates and be among the first to know when CoreGuard ONE becomes available
          </p>

          <form 
            onSubmit={handleSubmit} 
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 h-14 bg-card border-border/50 focus:border-primary transition-colors"
                required
              />
            </div>
            <Button 
              type="submit"
              size="lg"
              className="h-14 px-8 relative overflow-hidden group bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <span className="relative z-10">Notify Me</span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                style={{ background: 'var(--gradient-silver)' }}
              />
            </Button>
          </form>

          <p className="mt-8 text-sm text-muted-foreground">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};
