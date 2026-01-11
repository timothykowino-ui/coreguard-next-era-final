export const Footer = () => {
  return (
    <footer id="contact" className="bg-background border-t border-border">
      {/* existing footer content */}
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

          {/* Contact Info */}
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              CoreGuard Mobility is a product of{" "}
              <span className="text-foreground font-medium">Grovizhon LLP</span>, Nairobi, Kenya
            </p>
            <p className="text-sm text-muted-foreground">
              For inquiries, please contact us at:{" "}
              <a 
                href="mailto:info@coreguardmobility.com" 
                className="text-primary hover:text-primary/80 transition-colors duration-300 underline underline-offset-4"
              >
                info@coreguardmobility.com
              </a>
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center justify-center gap-6 text-xs text-primary/60">
            <a href="/privacy" className="hover:text-primary transition-colors duration-300">
              Privacy Policy
            </a>
            <span className="text-border">|</span>
            <a href="/terms" className="hover:text-primary transition-colors duration-300">
              Terms
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
