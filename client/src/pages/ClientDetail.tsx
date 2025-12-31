import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Client, FollowUp, Requirement, Proposal, Payment, Project } from "@shared/schema";
import { ArrowLeft, Plus } from "lucide-react";

export default function ClientDetail() {
  const { clientId } = useParams<{ clientId: string }>();

  const { data: client } = useQuery<Client>({
    queryKey: [`/api/crm/clients/${clientId}`],
  });

  const { data: followUps = [] } = useQuery<FollowUp[]>({
    queryKey: [`/api/crm/clients/${clientId}/follow-ups`],
  });

  const { data: requirement } = useQuery<Requirement>({
    queryKey: [`/api/crm/clients/${clientId}/requirement`],
  });

  const { data: proposal } = useQuery<Proposal>({
    queryKey: [`/api/crm/clients/${clientId}/proposal`],
  });

  const { data: payment } = useQuery<Payment>({
    queryKey: [`/api/crm/clients/${clientId}/payment`],
  });

  const { data: project } = useQuery<Project>({
    queryKey: [`/api/crm/clients/${clientId}/project`],
  });

  if (!client) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <Link href="/crm">
        <Button variant="ghost" data-testid="button-back">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Clients
        </Button>
      </Link>

      {/* Client Info */}
      <Card className="p-6">
        <h1 className="text-2xl font-bold mb-4">{client.name}</h1>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-secondary-foreground">Phone</p>
            <p className="font-semibold">{client.phone}</p>
          </div>
          {client.email && (
            <div>
              <p className="text-secondary-foreground">Email</p>
              <p className="font-semibold">{client.email}</p>
            </div>
          )}
          {client.company && (
            <div>
              <p className="text-secondary-foreground">Company</p>
              <p className="font-semibold">{client.company}</p>
            </div>
          )}
          <div>
            <p className="text-secondary-foreground">Service Needed</p>
            <p className="font-semibold">{client.serviceNeeded}</p>
          </div>
        </div>
      </Card>

      {/* Follow-Ups */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Follow-Ups (Most Important)</h2>
          <Link href={`/crm/clients/${clientId}/follow-up`}>
            <Button size="sm" data-testid="button-add-followup">
              <Plus className="w-4 h-4 mr-1" />
              New
            </Button>
          </Link>
        </div>
        {followUps.length === 0 ? (
          <p className="text-secondary-foreground">No follow-ups yet.</p>
        ) : (
          <div className="space-y-3">
            {followUps.map((fu) => (
              <div key={fu.id} className="p-3 bg-secondary rounded">
                <div className="flex items-center justify-between mb-2">
                  <Badge>{fu.followUpType}</Badge>
                  <Badge variant="outline">{fu.status}</Badge>
                </div>
                <p className="text-sm">{fu.discussionNotes}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Requirements */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Requirements</h2>
          <Link href={`/crm/clients/${clientId}/requirement`}>
            <Button size="sm" data-testid="button-add-requirement">
              <Plus className="w-4 h-4 mr-1" />
              New
            </Button>
          </Link>
        </div>
        {requirement ? (
          <div className="space-y-2 text-sm">
            {requirement.websiteType && <p><span className="font-semibold">Type:</span> {requirement.websiteType}</p>}
            {requirement.pagesNeeded && <p><span className="font-semibold">Pages:</span> {requirement.pagesNeeded}</p>}
            {requirement.features && <p><span className="font-semibold">Features:</span> {requirement.features}</p>}
            {requirement.budgetRange && <p><span className="font-semibold">Budget:</span> {requirement.budgetRange}</p>}
          </div>
        ) : (
          <p className="text-secondary-foreground">Not collected yet.</p>
        )}
      </Card>

      {/* Proposal */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Proposal</h2>
          <Link href={`/crm/clients/${clientId}/proposal`}>
            <Button size="sm" data-testid="button-add-proposal">
              <Plus className="w-4 h-4 mr-1" />
              New
            </Button>
          </Link>
        </div>
        {proposal ? (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="font-semibold">{proposal.proposedService}</span>
              <Badge>{proposal.proposalStatus}</Badge>
            </div>
            <p>₹{proposal.price}</p>
            <p className="text-secondary-foreground">Timeline: {proposal.timeline}</p>
          </div>
        ) : (
          <p className="text-secondary-foreground">Not created yet.</p>
        )}
      </Card>

      {/* Payment */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Payment</h2>
          <Link href={`/crm/clients/${clientId}/payment`}>
            <Button size="sm" data-testid="button-add-payment">
              <Plus className="w-4 h-4 mr-1" />
              New
            </Button>
          </Link>
        </div>
        {payment ? (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total:</span>
              <span className="font-semibold">₹{payment.totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span>Advance Paid:</span>
              <span className="font-semibold">₹{payment.advancePaid}</span>
            </div>
            <div className="flex justify-between">
              <span>Balance:</span>
              <span className="font-semibold">₹{payment.balanceAmount}</span>
            </div>
            <Badge variant="outline">{payment.paymentStatus}</Badge>
          </div>
        ) : (
          <p className="text-secondary-foreground">Not tracked yet.</p>
        )}
      </Card>

      {/* Project */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Project Status</h2>
          <Link href={`/crm/clients/${clientId}/project`}>
            <Button size="sm" data-testid="button-add-project">
              <Plus className="w-4 h-4 mr-1" />
              New
            </Button>
          </Link>
        </div>
        {project ? (
          <div className="space-y-2 text-sm">
            <Badge>{project.projectStage}</Badge>
            {project.lastUpdate && <p><span className="font-semibold">Last Update:</span> {project.lastUpdate}</p>}
            {project.nextAction && <p><span className="font-semibold">Next Action:</span> {project.nextAction}</p>}
          </div>
        ) : (
          <p className="text-secondary-foreground">Not created yet.</p>
        )}
      </Card>
    </div>
  );
}
