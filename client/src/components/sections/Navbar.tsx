import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, ChevronDown, ArrowRight } from "lucide-react";

interface NavbarProps {
    onCTAClick: () => void;
}

export function Navbar({ onCTAClick }: NavbarProps) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Determine active section based on scroll position
            const sections = [
                "hero",
                "about",
                "services",
                "portfolio",
                "process",
                "blog",
                "careers",
                "contact",
            ];
            const scrollPosition = window.scrollY + 100;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (
                        scrollPosition >= offsetTop &&
                        scrollPosition < offsetTop + offsetHeight
                    ) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
            setIsMobileMenuOpen(false);
        }
    };

    const navLinks = [
        { label: "Services", href: "services" },
        { label: "Process", href: "process" },
        { label: "About", href: "about" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled
                    ? "bg-slate-900/90 backdrop-blur-xl border-b border-purple-500/20 shadow-lg shadow-purple-500/10"
                    : "bg-slate-900/100 backdrop-blur-xl border-b border-teal-900/20 shadow-lg shadow-teal-500/10 "
            }`}
            data-testid="navbar">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    <button
                        onClick={() => scrollToSection("hero")}
                        className="flex items-center gap-2 group transition-all duration-300 hover:scale-105"
                        data-testid="link-logo">
                        <div className="relative flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all duration-300">
                            <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
                        </div>
                        <span className="font-heading font-bold text-lg lg:text-xl text-white">
                            DC Unovation
                        </span>
                    </button>

                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => scrollToSection(link.href)}
                                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                                    activeSection === link.href
                                        ? "text-white"
                                        : "text-gray-300 hover:text-white"
                                }`}
                                data-testid={`link-${link.href}`}>
                                {link.label}
                                {activeSection === link.href && (
                                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full"></span>
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center gap-3">
                        <Button
                            variant="ghost"
                            onClick={() => scrollToSection("pricing")}
                            className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                            data-testid="button-contact-nav">
                            Pricing
                        </Button>{" "}
                        <Button
                            variant="ghost"
                            onClick={() => scrollToSection("contact")}
                            className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                            data-testid="button-contact-nav">
                            Contact
                        </Button>
                        <Button
                            onClick={onCTAClick}
                            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 group"
                            data-testid="button-book-demo-nav">
                            Book Demo
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                        data-testid="button-mobile-menu-toggle">
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Enhanced Mobile Menu */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-b border-purple-500/20 shadow-lg"
                    data-testid="mobile-menu">
                    <div className="px-6 py-4 space-y-1">
                        {navLinks.map((link) => (
                            <button
                                key={link.href}
                                onClick={() => scrollToSection(link.href)}
                                className={`block w-full text-left py-3 px-4 text-sm font-medium rounded-lg transition-all duration-300 ${
                                    activeSection === link.href
                                        ? "text-white bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border-l-2 border-purple-500"
                                        : "text-gray-300 hover:text-white hover:bg-white/5"
                                }`}
                                data-testid={`link-mobile-${link.href}`}>
                                {link.label}
                            </button>
                        ))}
                        <div className="pt-4 space-y-3 border-t border-gray-800">
                            <Button
                                variant="ghost"
                                onClick={() => scrollToSection("contact")}
                                className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
                                data-testid="button-contact-mobile">
                                Contact
                            </Button>
                            <Button
                                onClick={onCTAClick}
                                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300"
                                data-testid="button-book-demo-mobile">
                                Book Demo
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
