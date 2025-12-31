import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Client } from "@shared/schema";
import { Plus } from "lucide-react";

export default function CrmDashboard() {
  const { data: clients, isLoading } = useQuery<Client[]>({
    queryKey: ["/api/crm/clients"],
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">CRM Dashboard</h1>
        <Link href="/crm/clients/new">
          <Button data-testid="button-add-client">
            <Plus className="w-4 h-4 mr-2" />
            New Client
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading clients...</div>
      ) : !clients || clients.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-secondary-foreground">No clients yet. Create your first client to get started.</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {clients.map((client) => (
            <Card key={client.id} className="p-4 hover-elevate">
              <Link href={`/crm/clients/${client.id}`}>
                <div className="cursor-pointer space-y-2">
                  <h3 className="font-semibold text-lg">{client.name}</h3>
                  <p className="text-sm text-secondary-foreground">{client.phone}</p>
                  {client.email && <p className="text-sm text-secondary-foreground">{client.email}</p>}
                  <p className="text-sm text-tertiary-foreground">{client.serviceNeeded}</p>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
