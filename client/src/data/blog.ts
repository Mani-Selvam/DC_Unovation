export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "modern-web-development-trends-2025",
    title: "Modern Web Development Trends to Watch in 2025",
    excerpt: "Explore the latest trends shaping the future of web development, from AI-powered tools to edge computing.",
    category: "Web Development",
    readTime: "5 min read",
    date: "Mar 15, 2025",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop",
    author: "Sarah Chen"
  },
  {
    id: "ux-design-principles",
    title: "10 UX Design Principles Every Designer Should Know",
    excerpt: "Master these fundamental UX principles to create interfaces that users love and businesses value.",
    category: "UI/UX",
    readTime: "7 min read",
    date: "Mar 10, 2025",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=800&h=600&fit=crop",
    author: "Michael Rodriguez"
  },
  {
    id: "automation-business-efficiency",
    title: "How Automation Can Transform Your Business Efficiency",
    excerpt: "Discover how smart automation strategies can save time, reduce costs, and scale your operations.",
    category: "Automation",
    readTime: "6 min read",
    date: "Mar 5, 2025",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    author: "David Park"
  }
];
