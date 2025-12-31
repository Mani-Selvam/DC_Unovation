import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { getStoredUser } from "@/lib/googleAuth";

interface ContactProps {
    onSubmit: (data: {
        name: string;
        email: string;
        phone?: string;
        message: string;
    }) => Promise<void>;
}

export function Contact({ onSubmit }: ContactProps) {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const user = getStoredUser();
        if (user) {
            setFormData((prev) => ({
                ...prev,
                name: user.name,
                email: user.email,
            }));
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit(formData);
            setFormData({ name: "", email: "", phone: "", message: "" });
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            label: "Email",
            value: "hello@dcunovation.com",
            href: "mailto:hello@dcunovation.com",
        },
        {
            icon: Phone,
            label: "Phone",
            value: "+1 (555) 123-4567",
            href: "tel:+15551234567",
        },
        {
            icon: MapPin,
            label: "Location",
            value: "San Francisco, CA",
            href: "#",
        },
    ];

    return (
        <section
            id="contact"
            className="py-1 lg:py-20 bg-background"
            data-testid="section-contact">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16 lg:mb-20">
                    <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                        <span className="text-sm font-semibold text-primary">
                            Get In Touch
                        </span>
                    </div>
                    <h2 className="font-heading font-bold text-3xl lg:text-5xl tracking-tight mb-6">
                        Let's Build Something Amazing
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Have a project in mind? We'd love to hear from you. Send
                        us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    <div className="space-y-8">
                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 group"
                                    data-testid={`contact-info-${info.label.toLowerCase()}`}>
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <info.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">
                                            {info.label}
                                        </p>
                                        <a
                                            href={info.href}
                                            className="font-semibold hover:text-primary transition-colors">
                                            {info.value}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8">
                            <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                                    <MapPin className="w-16 h-16 text-primary" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        data-testid="form-contact">
                        <div className="space-y-2">
                            <Label htmlFor="contact-name">
                                Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="contact-name"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                required
                                data-testid="input-contact-name"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact-email">
                                Email{" "}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                id="contact-email"
                                type="email"
                                placeholder="your.email@example.com"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        email: e.target.value,
                                    })
                                }
                                required
                                data-testid="input-contact-email"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact-phone">
                                Phone (Optional)
                            </Label>
                            <Input
                                id="contact-phone"
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        phone: e.target.value,
                                    })
                                }
                                data-testid="input-contact-phone"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="contact-message">
                                Message{" "}
                                <span className="text-destructive">*</span>
                            </Label>
                            <Textarea
                                id="contact-message"
                                placeholder="Tell us about your project..."
                                rows={6}
                                value={formData.message}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        message: e.target.value,
                                    })
                                }
                                required
                                data-testid="input-contact-message"
                            />
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full"
                            disabled={isSubmitting}
                            data-testid="button-submit-contact">
                            {isSubmitting ? (
                                "Sending..."
                            ) : (
                                <>
                                    <Send className="mr-2 w-4 h-4" />
                                    Send Message
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
