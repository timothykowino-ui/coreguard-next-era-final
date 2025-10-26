export const Footer = () => {
  return (
    <footer id="contact" className="relative border-t">
      {/* Thin silver divider */}
      <div 
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'var(--gradient-silver)' }}
      />

      <div className="container mx-auto px-6 py-12">
        <div className="text-center space-y-6">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h3 className="heading-font text-3xl font-bold tracking-wide mb-3">
              CoreGuard Mobility
            </h3>
            <p className="text-sm text-primary/70 italic tracking-wide">
              Engineered from Experience
            </p>
          </div>

          {/* Company Info */}
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-sm text-muted-foreground leading-relaxed">
              CoreGuard Mobility is a fully owned subsidiary of{" "}
              <span className="text-foreground font-medium">Grovizhon LLP</span>, Nairobi, Kenya
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center justify-center gap-6 text-xs text-primary/60">
            <a href="#" className="hover:text-primary transition-colors duration-300">
              Privacy Policy
            </a>
            <span className="text-border">|</span>
            <a href="#" className="hover:text-primary transition-colors duration-300">
              Terms
            </a>
            <span className="text-border">|</span>
            <a href="#contact" className="hover:text-primary transition-colors duration-300">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="pt-8 mt-8 border-t border-border/30">
            <p className="text-xs text-muted-foreground/70">
              © {new Date().getFullYear()} CoreGuard Mobility. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
