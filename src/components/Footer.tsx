export const Footer = () => {
  return (
    <footer className="relative border-t">
      {/* Metallic divider */}
      <div 
        className="absolute top-0 left-0 w-full h-px"
        style={{ background: 'var(--gradient-silver)' }}
      />

      <div className="container mx-auto px-6 py-12">
        <div className="text-center space-y-4">
          {/* Logo/Brand */}
          <div className="mb-6">
            <h3 className="text-2xl font-light tracking-wide mb-2">
              CoreGuard Mobility
            </h3>
            <p className="text-sm text-muted-foreground italic">
              Engineered from Experience
            </p>
          </div>

          {/* Company Info */}
          <div className="max-w-2xl mx-auto">
            <p className="text-sm text-muted-foreground leading-relaxed">
              CoreGuard Mobility is a fully owned subsidiary of{" "}
              <span className="text-foreground font-medium">Grovizhon LLP</span>, Nairobi, Kenya
            </p>
          </div>

          {/* Copyright */}
          <div className="pt-8 mt-8 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} CoreGuard Mobility. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
