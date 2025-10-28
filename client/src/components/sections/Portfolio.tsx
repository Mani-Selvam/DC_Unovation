import { portfolioProjects, type PortfolioProject } from "@/data/portfolio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface PortfolioProps {
  onProjectInterest: (project: PortfolioProject) => void;
}

export function Portfolio({ onProjectInterest }: PortfolioProps) {
  return (
    <section
      id="portfolio"
      className="py-20 lg:py-32 bg-muted/30"
      data-testid="section-portfolio"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-semibold text-primary">Portfolio</span>
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-5xl tracking-tight mb-6">
            Our Work Speaks
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}
              For Itself
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of successful projects and see how we've helped businesses thrive
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {portfolioProjects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden border-card-border hover-elevate active-elevate-2 transition-all duration-300"
              data-testid={`card-portfolio-${project.id}`}
            >
              <CardContent className="p-0">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <Badge variant="secondary" className="text-xs">
                      {project.category}
                    </Badge>
                    <h3 className="font-heading font-bold text-xl line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-sm font-semibold text-primary mb-2">
                      Results:
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {project.result}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <button
                    onClick={() => onProjectInterest(project)}
                    className="w-full mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover-elevate active-elevate-2 transition-all"
                    data-testid={`button-project-interest-${project.id}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                    I want a similar project
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
