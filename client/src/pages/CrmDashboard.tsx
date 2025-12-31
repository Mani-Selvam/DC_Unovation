import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CrmSidebar } from "@/components/CrmSidebar";
import type { Client } from "@shared/schema";
import { Plus, Users, PhoneCall, Briefcase } from "lucide-react";

export default function CrmDashboard() {
  const { data: clients, isLoading } = useQuery<Client[]>({
    queryKey: ["/api/crm/clients"],
  });

  const totalClients = clients?.length || 0;

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <CrmSidebar />
      
      <div className="flex-1 overflow-auto p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">CRM Dashboard</h1>
            <p className="text-muted-foreground">Manage your clients and track follow-ups</p>
          </div>
          <Link href="/admin/dashboard/crm/clients/new">
            <Button size="lg" className="gap-2" data-testid="button-add-client">
              <Plus className="w-5 h-5" />
              New Client
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 bg-white dark:bg-slate-800 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Total Clients</p>
                <p className="text-3xl font-bold text-foreground mt-1">{totalClients}</p>
              </div>
              <Users className="w-10 h-10 text-blue-500 opacity-20" />
            </div>
          </Card>
          <Card className="p-6 bg-white dark:bg-slate-800 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Active Leads</p>
                <p className="text-3xl font-bold text-foreground mt-1">{Math.max(0, totalClients)}</p>
              </div>
              <Briefcase className="w-10 h-10 text-green-500 opacity-20" />
            </div>
          </Card>
          <Card className="p-6 bg-white dark:bg-slate-800 border-l-4 border-l-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Follow-ups Pending</p>
                <p className="text-3xl font-bold text-foreground mt-1">0</p>
              </div>
              <PhoneCall className="w-10 h-10 text-purple-500 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Clients List */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4">Your Clients</h2>
          {isLoading ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground">Loading clients...</p>
            </Card>
          ) : !clients || clients.length === 0 ? (
            <Card className="p-12 text-center border-2 border-dashed">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-40" />
              <p className="text-muted-foreground text-lg mb-4">No clients yet</p>
              <p className="text-muted-foreground mb-6">Start building your client list by adding your first client.</p>
              <Link href="/admin/dashboard/crm/clients/new">
                <Button size="lg" className="gap-2" data-testid="button-add-first-client">
                  <Plus className="w-5 h-5" />
                  Create First Client
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {clients.map((client) => (
                <Link key={client.id} href={`/admin/dashboard/crm/clients/${client.id}`}>
                  <Card className="p-6 hover-elevate h-full bg-white dark:bg-slate-800 cursor-pointer transition-all duration-200">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="font-bold text-lg text-foreground pr-2 line-clamp-2">{client.name}</h3>
                        <Badge variant="secondary" className="whitespace-nowrap flex-shrink-0">New</Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <PhoneCall className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          <p className="text-foreground font-medium">{client.phone}</p>
                        </div>
                        
                        {client.email && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-muted-foreground flex-shrink-0">@</span>
                            <p className="text-foreground truncate">{client.email}</p>
                          </div>
                        )}
                        
                        {client.company && (
                          <div className="flex items-center gap-2 text-sm">
                            <Briefcase className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <p className="text-foreground">{client.company}</p>
                          </div>
                        )}
                        
                        <div className="pt-2 border-t border-border">
                          <p className="text-xs text-muted-foreground mb-2">Interested in</p>
                          <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 hover:bg-blue-200 dark:hover:bg-blue-800">
                            {client.serviceNeeded}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
