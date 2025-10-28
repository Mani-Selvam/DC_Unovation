import { blogPosts } from "@/data/blog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export function Blog() {
  return (
    <section
      id="blog"
      className="py-20 lg:py-32 bg-background"
      data-testid="section-blog"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-semibold text-primary">Blog & Insights</span>
          </div>
          <h2 className="font-heading font-bold text-3xl lg:text-5xl tracking-tight mb-6">
            Latest Articles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and insights from our team
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {blogPosts.map((post) => (
            <Card
              key={post.id}
              className="group overflow-hidden border-card-border hover-elevate active-elevate-2 transition-all duration-300"
              data-testid={`card-blog-${post.id}`}
            >
              <CardContent className="p-0">
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
                      {post.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-2">
                    <button className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1 group-hover:gap-2">
                      Read article
                      <ArrowRight className="w-4 h-4 transition-all" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover-elevate active-elevate-2 font-semibold transition-all">
            View all articles
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
