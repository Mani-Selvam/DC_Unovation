import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";

interface NavbarProps {
  onCTAClick: () => void;
}

export function Navbar({ onCTAClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "About", href: "about" },
    { label: "Services", href: "services" },
    { label: "Portfolio", href: "portfolio" },
    { label: "Process", href: "process" },
    { label: "Blog", href: "blog" },
    { label: "Careers", href: "careers" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 group"
            data-testid="link-logo"
          >
            <div className="flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-primary to-secondary">
              <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg lg:text-xl">
              DC Unovation
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                data-testid={`link-${link.href}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              variant="ghost"
              onClick={() => scrollToSection("contact")}
              data-testid="button-contact-nav"
            >
              Contact
            </Button>
            <Button onClick={onCTAClick} data-testid="button-book-demo-nav">
              Book Demo
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden"
            data-testid="button-mobile-menu-toggle"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden bg-background border-b border-border"
          data-testid="mobile-menu"
        >
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                data-testid={`link-mobile-${link.href}`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 space-y-2">
              <Button
                variant="ghost"
                onClick={() => scrollToSection("contact")}
                className="w-full"
                data-testid="button-contact-mobile"
              >
                Contact
              </Button>
              <Button
                onClick={onCTAClick}
                className="w-full"
                data-testid="button-book-demo-mobile"
              >
                Book Demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
