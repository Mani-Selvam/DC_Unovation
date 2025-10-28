export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  result: string;
  image: string;
  tags: string[];
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform Redesign",
    category: "Web Development",
    description: "Complete redesign and development of a modern e-commerce platform with seamless checkout experience",
    result: "200% increase in conversion rate, 60% faster load times",
    image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=600&fit=crop",
    tags: ["React", "TypeScript", "Stripe", "Tailwind CSS"]
  },
  {
    id: "fintech-mobile-app",
    title: "FinTech Mobile App",
    category: "App Development",
    description: "Cross-platform mobile banking application with advanced security features and real-time transactions",
    result: "50K+ downloads in first month, 4.8★ rating",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop",
    tags: ["React Native", "Node.js", "Security", "API Integration"]
  },
  {
    id: "saas-dashboard",
    title: "SaaS Analytics Dashboard",
    category: "UI/UX Design",
    description: "Intuitive analytics dashboard for SaaS platform with real-time data visualization and insights",
    result: "40% reduction in time-to-insight for users",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    tags: ["Figma", "React", "D3.js", "Data Visualization"]
  },
  {
    id: "automation-workflow",
    title: "Marketing Automation System",
    category: "Automation",
    description: "Complete marketing automation workflow connecting CRM, email, and social media platforms",
    result: "70% time saved on manual tasks, 3x lead generation",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    tags: ["n8n", "API Integration", "CRM", "Email Marketing"]
  },
  {
    id: "brand-identity",
    title: "Tech Startup Branding",
    category: "Branding",
    description: "Complete brand identity including logo, color system, typography, and brand guidelines",
    result: "Cohesive brand presence across all channels",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop",
    tags: ["Brand Strategy", "Logo Design", "Guidelines", "Assets"]
  },
  {
    id: "healthcare-portal",
    title: "Patient Portal System",
    category: "Web Development",
    description: "Secure patient portal for healthcare provider with appointment booking and medical records",
    result: "85% patient satisfaction, HIPAA compliant",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",
    tags: ["Security", "Healthcare", "React", "HIPAA"]
  }
];
