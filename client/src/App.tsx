import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import CrmDashboard from "@/pages/CrmDashboard";
import ClientEntry from "@/pages/ClientEntry";
import FollowUpForm from "@/pages/FollowUpForm";
import RequirementForm from "@/pages/RequirementForm";
import ProposalForm from "@/pages/ProposalForm";
import PaymentForm from "@/pages/PaymentForm";
import ProjectForm from "@/pages/ProjectForm";
import ClientDetail from "@/pages/ClientDetail";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      
      {/* CRM Routes - Integrated under Admin Dashboard */}
      <Route path="/admin/dashboard/crm" component={CrmDashboard} />
      <Route path="/admin/dashboard/crm/clients/new" component={ClientEntry} />
      <Route path="/admin/dashboard/crm/clients/:clientId" component={ClientDetail} />
      <Route path="/admin/dashboard/crm/clients/:clientId/follow-up" component={FollowUpForm} />
      <Route path="/admin/dashboard/crm/clients/:clientId/requirement" component={RequirementForm} />
      <Route path="/admin/dashboard/crm/clients/:clientId/proposal" component={ProposalForm} />
      <Route path="/admin/dashboard/crm/clients/:clientId/payment" component={PaymentForm} />
      <Route path="/admin/dashboard/crm/clients/:clientId/project" component={ProjectForm} />
      
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
