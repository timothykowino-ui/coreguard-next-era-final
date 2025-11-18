import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Our Story", href: "#story" },
  { name: "Customization", href: "#customize" },
  { name: "Partners", href: "#partners" }
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    
    if (location.pathname !== '/') {
      // Navigate to home first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border/50' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center h-20">
          <ul className="flex items-center gap-12">
            {navItems.map((item) => (
              <li key={item.name}>
              <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="heading-font text-sm tracking-wider uppercase text-white/80 hover:text-white transition-all duration-300 relative group"
                >
                  {item.name}
                  <span 
                    className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-transparent via-white to-transparent group-hover:w-full transition-all duration-500"
                    style={{ boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)' }}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
