import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

interface HeroProps {
  onBookDemo: () => void;
  onGetQuote: () => void;
}

export function Hero({ onBookDemo, onGetQuote }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-48 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-48 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary">
                Transforming Digital Experiences
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.1]">
                Dream. Create.
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {" "}
                  Innovate.
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                We transform your digital vision into reality with cutting-edge web development,
                app development, UI/UX design, automation, and branding services.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={onBookDemo}
                className="group"
                data-testid="button-book-demo-hero"
              >
                Book a Demo
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onGetQuote}
                className="group"
                data-testid="button-get-quote-hero"
              >
                <Play className="mr-2 w-4 h-4" />
                Get a Quote
              </Button>
            </div>

            <div className="pt-8">
              <p className="text-sm text-muted-foreground mb-4">
                Trusted by innovative companies
              </p>
              <div className="flex flex-wrap items-center gap-8 opacity-60">
                {["TechCorp", "InnovateLabs", "FutureScale", "DigitalPro"].map(
                  (company) => (
                    <div
                      key={company}
                      className="font-semibold text-lg text-foreground"
                    >
                      {company}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-2xl blur-2xl" />
              <div className="relative bg-card/50 backdrop-blur-sm border border-card-border rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl" />
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-8 w-20 bg-primary/20 rounded" />
                    <div className="h-8 w-20 bg-secondary/20 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
