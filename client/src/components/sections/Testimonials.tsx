import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO",
      company: "TechStart Inc",
      content: "DC Unovation transformed our digital presence completely. Their attention to detail and commitment to excellence is unmatched. Our conversion rates have tripled!",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateLabs",
      content: "Working with DC Unovation was a game-changer. They understood our vision and delivered beyond expectations. The mobile app they built has received incredible user feedback.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "GrowthCo",
      content: "The automation solutions they implemented saved us countless hours. Professional, responsive, and truly innovative. Highly recommend for any digital project!",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    },
    {
      name: "David Park",
      role: "Founder",
      company: "DigitalFirst",
      content: "From concept to launch, DC Unovation handled everything professionally. Their team's expertise in both design and development is impressive. Our platform is now industry-leading.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    {
      name: "Lisa Thompson",
      role: "Operations Lead",
      company: "ScaleUp Solutions",
      content: "The branding work they did gave us a clear identity in the market. Every detail was carefully thought through. We've seen a significant increase in brand recognition.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    },
    {
      name: "James Wilson",
      role: "CTO",
      company: "FutureTech",
      content: "DC Unovation's technical expertise and innovative approach helped us modernize our entire platform. The results speak for themselves - faster, better, stronger.",
      rating: 5,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-20 lg:py-32 bg-background"
      data-testid="section-testimonials"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-semibold text-primary">Testimonials</span>
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-5xl tracking-tight mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it - hear from the businesses we've helped succeed
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-card-border hover-elevate active-elevate-2 transition-all"
              data-testid={`card-testimonial-${index}`}
            >
              <CardContent className="p-6 lg:p-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Quote className="w-8 h-8 text-primary/20" />
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full bg-muted"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
