import { Code, Smartphone, Palette, Zap, Sparkles, Megaphone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Services() {
  const services = [
    {
      icon: Code,
      title: "Web Development",
      description: "Custom websites and web applications built with the latest technologies for optimal performance and user experience.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Smartphone,
      title: "App Development",
      description: "Native and cross-platform mobile applications that engage users and drive business growth.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Intuitive and beautiful interfaces designed with user research and best practices in mind.",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Zap,
      title: "Automation",
      description: "Streamline your workflows with intelligent automation solutions that save time and reduce errors.",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Sparkles,
      title: "Branding",
      description: "Comprehensive brand identity design that tells your story and resonates with your audience.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Megaphone,
      title: "Digital Marketing",
      description: "Strategic digital marketing campaigns that increase visibility and drive conversions.",
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  return (
    <section
      id="services"
      className="py-20 lg:py-32 bg-muted/30"
      data-testid="section-services"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-semibold text-primary">Our Services</span>
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-5xl tracking-tight mb-6">
            What We Do Best
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your unique needs and goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group border-card-border hover-elevate active-elevate-2 transition-all duration-300"
              data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <CardContent className="p-6 lg:p-8">
                <div className="space-y-4">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.gradient}`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-xl">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 group-hover:gap-2">
                    Learn more
                    <span className="transition-all">→</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
