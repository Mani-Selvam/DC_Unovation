import { useEffect, useState } from "react";
import { Users, Briefcase, Globe, Heart } from "lucide-react";

function Counter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
}

export function Metrics() {
  const metrics = [
    {
      icon: Users,
      value: 150,
      suffix: "+",
      label: "Happy Clients",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Briefcase,
      value: 300,
      suffix: "+",
      label: "Projects Completed",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Globe,
      value: 25,
      suffix: "+",
      label: "Countries Served",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Heart,
      value: 98,
      suffix: "%",
      label: "Client Satisfaction",
      gradient: "from-red-500 to-orange-500",
    },
  ];

  return (
    <section
      className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5"
      data-testid="section-metrics"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl lg:text-4xl tracking-tight mb-4">
            Results That Matter
          </h2>
          <p className="text-lg text-muted-foreground">
            Numbers that showcase our commitment to excellence
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="relative group"
              data-testid={`metric-${metric.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-10 rounded-2xl blur-xl group-hover:blur-2xl group-hover:opacity-20 transition-all`} />
              <div className="relative bg-card border border-card-border rounded-2xl p-6 lg:p-8 text-center hover-elevate active-elevate-2">
                <metric.icon className={`w-8 h-8 lg:w-10 lg:h-10 mx-auto mb-4 bg-gradient-to-br ${metric.gradient} bg-clip-text text-transparent`} style={{ WebkitTextFillColor: 'transparent' }} />
                <div className="font-heading font-bold text-3xl lg:text-5xl mb-2">
                  <Counter end={metric.value} suffix={metric.suffix} />
                </div>
                <p className="text-sm lg:text-base text-muted-foreground font-medium">
                  {metric.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
