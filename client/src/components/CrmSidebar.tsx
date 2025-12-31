import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { BarChart3, Settings, Users, FileText, AlertCircle, MessageSquare, Quote, Mail, LayoutDashboard } from "lucide-react";

export function CrmSidebar() {
  const [location] = useLocation();

  const menuItems = [
    {
      label: "Overview",
      href: "/admin/dashboard",
      icon: BarChart3,
      testId: "button-crm-overview",
    },
    {
      label: "Inquiries",
      href: "/admin/dashboard/inquiries",
      icon: MessageSquare,
      testId: "button-crm-inquiries",
    },
    {
      label: "Quotes",
      href: "/admin/dashboard/quotes",
      icon: Quote,
      testId: "button-crm-quotes",
    },
    {
      label: "Contact Forms",
      href: "/admin/dashboard/contact",
      icon: FileText,
      testId: "button-crm-contact",
    },
    {
      label: "Subscribers",
      href: "/admin/dashboard/newsletter",
      icon: Mail,
      testId: "button-crm-subscribers",
    },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 p-6 h-full sticky top-0 overflow-y-auto">
      {/* Logo/Title */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-500 rounded-lg p-2 shadow-sm">
          <LayoutDashboard className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-foreground">DC Unovation</h2>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Navigation</p>
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 h-11 ${
                    isActive
                      ? "bg-purple-600 text-white hover:bg-purple-700"
                      : "text-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                  data-testid={item.testId}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer Info */}
      <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-700">
        <p className="text-xs text-muted-foreground">
          Manage your CRM operations and client interactions
        </p>
      </div>
    </aside>
  );
}
