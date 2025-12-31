import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { BarChart3, Settings, Users, FileText, AlertCircle } from "lucide-react";

export function CrmSidebar() {
  const [location] = useLocation();

  const menuItems = [
    {
      label: "Overview",
      href: "/admin/dashboard/crm",
      icon: BarChart3,
      testId: "button-crm-overview",
    },
    {
      label: "Settings",
      href: "/admin/dashboard/crm/settings",
      icon: Settings,
      testId: "button-crm-settings",
    },
    {
      label: "Clients",
      href: "/admin/dashboard/crm",
      icon: Users,
      testId: "button-crm-clients",
    },
    {
      label: "Reports",
      href: "/admin/dashboard/crm/reports",
      icon: FileText,
      testId: "button-crm-reports",
    },
    {
      label: "Admin Controls",
      href: "/admin/dashboard/crm/admin",
      icon: AlertCircle,
      testId: "button-crm-admin",
    },
  ];

  const dashboardItems = [
    {
      label: "Main Dashboard",
      href: "/admin/dashboard",
      icon: BarChart3,
      testId: "button-admin-dashboard",
    }
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700 p-6 h-full sticky top-0 overflow-y-auto">
      {/* Logo/Title */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-foreground">CRM Control</h2>
        <Link href="/admin/dashboard" className="text-xs text-muted-foreground mt-1 hover:text-purple-500 transition-colors">
          Admin Dashboard
        </Link>
      </div>

      {/* Navigation */}
      <nav className="space-y-6">
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Navigation</p>
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                location === item.href ||
                (item.href !== "/admin/dashboard/crm" && location.startsWith(item.href));

              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start gap-3 ${
                      isActive
                        ? "bg-purple-500 text-white hover:bg-purple-600"
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
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Global</p>
          <div className="space-y-2">
            {dashboardItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
                    data-testid={item.testId}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              );
            })}
          </div>
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
