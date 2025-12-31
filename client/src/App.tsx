import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import CrmDashboard from "@/pages/CrmDashboard";
import CrmSettings from "@/pages/CrmSettings";
import CrmReports from "@/pages/CrmReports";
import CrmAdmin from "@/pages/CrmAdmin";
import ClientDetail from "@/pages/ClientDetail";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/dashboard/inquiries">
        {(props: any) => <AdminDashboard {...props} defaultTab="inquiries" />}
      </Route>
      <Route path="/admin/dashboard/quotes">
        {(props: any) => <AdminDashboard {...props} defaultTab="quotes" />}
      </Route>
      <Route path="/admin/dashboard/contact">
        {(props: any) => <AdminDashboard {...props} defaultTab="contact" />}
      </Route>
      <Route path="/admin/dashboard/newsletter">
        {(props: any) => <AdminDashboard {...props} defaultTab="newsletter" />}
      </Route>
      
      {/* CRM Routes - Integrated under Admin Dashboard */}
      <Route path="/admin/dashboard/crm" component={CrmDashboard} />
      <Route path="/admin/dashboard/crm/settings" component={CrmSettings} />
      <Route path="/admin/dashboard/crm/reports" component={CrmReports} />
      <Route path="/admin/dashboard/crm/admin" component={CrmAdmin} />
      <Route path="/admin/dashboard/crm/clients/:clientId" component={ClientDetail} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
