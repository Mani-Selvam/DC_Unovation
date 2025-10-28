import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Clock, Users } from "lucide-react";

interface CareersProps {
  onApplyClick: () => void;
}

export function Careers({ onApplyClick }: CareersProps) {
  const openings = [
    {
      title: "Senior Full-Stack Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Join our engineering team to build cutting-edge web applications using modern technologies.",
      requirements: ["5+ years experience", "React & Node.js", "TypeScript"],
    },
    {
      title: "UI/UX Designer",
      department: "Design",
      location: "Hybrid",
      type: "Full-time",
      description: "Create beautiful, user-centered designs that delight users and drive business results.",
      requirements: ["3+ years experience", "Figma proficiency", "Design systems"],
    },
    {
      title: "DevOps Engineer",
      department: "Operations",
      location: "Remote",
      type: "Contract",
      description: "Help us build and maintain scalable infrastructure for our growing client base.",
      requirements: ["CI/CD expertise", "Cloud platforms", "Docker & K8s"],
    },
  ];

  return (
    <section
      id="careers"
      className="py-20 lg:py-32 bg-muted/30"
      data-testid="section-careers"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-semibold text-primary">Join Our Team</span>
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-5xl tracking-tight mb-6">
            Build Your Career
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {" "}
              With Us
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're always looking for talented individuals who are passionate about innovation and excellence
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
          <div className="space-y-6">
            <h3 className="font-heading font-bold text-2xl lg:text-3xl">
              Why Work With Us?
            </h3>
            <div className="space-y-4">
              {[
                {
                  icon: Users,
                  title: "Collaborative Culture",
                  description: "Work with a talented team that values creativity and innovation",
                },
                {
                  icon: Briefcase,
                  title: "Growth Opportunities",
                  description: "Continuous learning and career development programs",
                },
                {
                  icon: Clock,
                  title: "Work-Life Balance",
                  description: "Flexible hours and remote work options",
                },
              ].map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{benefit.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-heading font-bold text-2xl lg:text-3xl">
              Open Positions
            </h3>
            <div className="space-y-4">
              {openings.map((opening, index) => (
                <Card
                  key={index}
                  className="border-card-border hover-elevate active-elevate-2 transition-all"
                  data-testid={`card-job-${opening.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-heading font-bold text-lg">
                          {opening.title}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">
                            <MapPin className="w-3 h-3 mr-1" />
                            {opening.location}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {opening.type}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {opening.department}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {opening.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {opening.requirements.map((req, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground"
                          >
                            {req}
                          </span>
                        ))}
                      </div>

                      <Button
                        onClick={onApplyClick}
                        className="w-full"
                        data-testid={`button-apply-${opening.title.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
