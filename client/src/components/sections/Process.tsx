import { Search, PenTool, Code2, TestTube, Rocket } from "lucide-react";

export function Process() {
  const steps = [
    {
      icon: Search,
      title: "Discovery",
      description: "We dive deep into understanding your business, goals, and target audience to create a solid foundation.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: PenTool,
      title: "Design",
      description: "Our designers craft beautiful, user-centered interfaces that align with your brand and delight users.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Code2,
      title: "Build",
      description: "Expert developers bring designs to life with clean, scalable code and cutting-edge technologies.",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: TestTube,
      title: "Test",
      description: "Rigorous testing ensures everything works flawlessly across devices, browsers, and scenarios.",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: Rocket,
      title: "Launch",
      description: "We deploy your project with precision and provide ongoing support to ensure continued success.",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  ];

  return (
    <section
      id="process"
      className="py-20 lg:py-32 bg-background"
      data-testid="section-process"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-semibold text-primary">Our Process</span>
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-5xl tracking-tight mb-6">
            How We Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A proven methodology that delivers exceptional results every time
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative group"
                data-testid={`step-${step.title.toLowerCase()}`}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className={`absolute inset-0 ${step.bgColor} rounded-2xl blur-xl group-hover:blur-2xl transition-all`} />
                    <div className="relative bg-card border border-card-border rounded-2xl p-6 shadow-lg hover-elevate active-elevate-2">
                      <step.icon className={`w-8 h-8 ${step.color}`} />
                    </div>
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {index + 1}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-xl">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute left-1/2 -bottom-4 w-0.5 h-8 bg-gradient-to-b from-primary to-primary/20 -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
