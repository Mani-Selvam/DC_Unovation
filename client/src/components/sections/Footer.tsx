import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Github, Twitter, Linkedin, Instagram } from "lucide-react";

interface FooterProps {
  onNewsletterSubmit: (email: string) => Promise<void>;
}

export function Footer({ onNewsletterSubmit }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    try {
      await onNewsletterSubmit(email);
      setEmail("");
    } finally {
      setIsSubmitting(false);
    }
  };

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
    }
  };

  const footerLinks = {
    Services: [
      { label: "Web Development", href: "services" },
      { label: "App Development", href: "services" },
      { label: "UI/UX Design", href: "services" },
      { label: "Automation", href: "services" },
      { label: "Branding", href: "services" },
    ],
    Company: [
      { label: "About Us", href: "about" },
      { label: "Portfolio", href: "portfolio" },
      { label: "Careers", href: "careers" },
      { label: "Blog", href: "blog" },
      { label: "Contact", href: "contact" },
    ],
    Resources: [
      { label: "Case Studies", href: "portfolio" },
      { label: "Our Process", href: "process" },
      { label: "Testimonials", href: "testimonials" },
      { label: "FAQ", href: "contact" },
    ],
  };

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-muted/30 border-t border-border" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="py-16 lg:py-20">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary">
                  <Sparkles className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="font-heading font-bold text-xl">
                  DC Unovation
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-sm">
                Transforming digital dreams into reality through innovative design,
                development, and strategic solutions.
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover-elevate active-elevate-2 transition-all"
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="space-y-4">
                <h3 className="font-semibold text-sm uppercase tracking-wider">
                  {title}
                </h3>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-border">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-semibold mb-2">Stay Updated</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Subscribe to our newsletter for the latest updates and insights.
                </p>
                <form
                  onSubmit={handleSubmit}
                  className="flex gap-2"
                  data-testid="form-newsletter-footer"
                >
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    data-testid="input-newsletter-email"
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    data-testid="button-subscribe-newsletter"
                  >
                    {isSubmitting ? "..." : "Subscribe"}
                  </Button>
                </form>
              </div>

              <div className="md:text-right space-y-2">
                <p className="text-sm text-muted-foreground">
                  &copy; {new Date().getFullYear()} DC Unovation. All rights reserved.
                </p>
                <div className="flex gap-6 md:justify-end text-sm">
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </button>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
