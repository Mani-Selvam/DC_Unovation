import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Client, FollowUp, Requirement, Proposal, Payment, Project } from "@shared/schema";
import { ArrowLeft, Plus, Phone, Mail, Building2, CheckCircle2, Clock, FileText, CreditCard, Hammer } from "lucide-react";
import { useState } from "react";
import { FollowUpDialog } from "@/components/FollowUpDialog";
import { RequirementDialog } from "@/components/RequirementDialog";
import { ProposalDialog } from "@/components/ProposalDialog";
import { PaymentDialog } from "@/components/PaymentDialog";
import { ProjectDialog } from "@/components/ProjectDialog";

export default function ClientDetail() {
  const { clientId } = useParams<{ clientId: string }>();
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false);
  const [isRequirementOpen, setIsRequirementOpen] = useState(false);
  const [isProposalOpen, setIsProposalOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isProjectOpen, setIsProjectOpen] = useState(false);


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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-8">
      <div className="max-w-5xl mx-auto">
        <FollowUpDialog 
          clientId={clientId!} 
          open={isFollowUpOpen} 
          onOpenChange={setIsFollowUpOpen} 
        />
        <RequirementDialog 
          clientId={clientId!} 
          requirement={requirement}
          open={isRequirementOpen} 
          onOpenChange={setIsRequirementOpen} 
        />
        <ProposalDialog 
          clientId={clientId!} 
          proposal={proposal}
          open={isProposalOpen} 
          onOpenChange={setIsProposalOpen} 
        />
        <PaymentDialog 
          clientId={clientId!} 
          payment={payment}
          open={isPaymentOpen} 
          onOpenChange={setIsPaymentOpen} 
        />
        <ProjectDialog 
          clientId={clientId!} 
          project={project}
          open={isProjectOpen} 
          onOpenChange={setIsProjectOpen} 
        />
        {/* Back Button */}
        <Link href="/admin/dashboard/crm">
          <Button variant="ghost" className="mb-6" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Clients
          </Button>
        </Link>


        {/* Client Header */}
        <Card className="p-8 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border border-blue-200 dark:border-blue-800">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{client.name}</h1>
              <p className="text-muted-foreground">Client Profile & Project Status</p>
            </div>
            <Badge className="bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100">Active</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-semibold text-foreground truncate">{client.phone}</p>
              </div>
            </div>
            {client.email && (
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-semibold text-foreground truncate">{client.email}</p>
                </div>
              </div>
            )}
            {client.company && (
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Company</p>
                  <p className="text-sm font-semibold text-foreground truncate">{client.company}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <Hammer className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Service</p>
                <p className="text-sm font-semibold text-foreground truncate">{client.serviceNeeded}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Progress Pipeline */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-foreground">Project Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Follow-Up Status */}
            <div className="border-l-4 border-l-blue-500 p-4 bg-blue-50 dark:bg-blue-950 rounded-r">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <p className="font-semibold text-foreground">Follow-Ups</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {followUps.length === 0 ? "No follow-ups yet" : `${followUps.length} interaction${followUps.length > 1 ? 's' : ''}`}
              </p>
            </div>

            {/* Requirement Status */}
            <div className={`border-l-4 p-4 rounded-r ${requirement ? 'border-l-green-500 bg-green-50 dark:bg-green-950' : 'border-l-gray-300 bg-gray-50 dark:bg-gray-950'}`}>
              <div className="flex items-center gap-2 mb-2">
                <FileText className={`w-5 h-5 ${requirement ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                <p className="font-semibold text-foreground">Requirements</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {requirement ? "Collected" : "Pending"}
              </p>
            </div>

            {/* Proposal Status */}
            <div className={`border-l-4 p-4 rounded-r ${proposal ? 'border-l-purple-500 bg-purple-50 dark:bg-purple-950' : 'border-l-gray-300 bg-gray-50 dark:bg-gray-950'}`}>
              <div className="flex items-center gap-2 mb-2">
                <FileText className={`w-5 h-5 ${proposal ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'}`} />
                <p className="font-semibold text-foreground">Proposal</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {proposal ? "Created" : "Pending"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Payment Status */}
            <div className={`border-l-4 p-4 rounded-r ${payment ? 'border-l-green-500 bg-green-50 dark:bg-green-950' : 'border-l-gray-300 bg-gray-50 dark:bg-gray-950'}`}>
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className={`w-5 h-5 ${payment ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                <p className="font-semibold text-foreground">Payment</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {payment ? payment.balanceAmount === 0 ? "Completed" : "In Progress" : "Pending"}
              </p>
            </div>

            {/* Project Status */}
            <div className={`border-l-4 p-4 rounded-r ${project ? 'border-l-orange-500 bg-orange-50 dark:bg-orange-950' : 'border-l-gray-300 bg-gray-50 dark:bg-gray-950'}`}>
              <div className="flex items-center gap-2 mb-2">
                <Hammer className={`w-5 h-5 ${project ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400'}`} />
                <p className="font-semibold text-foreground">Project</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {project ? project.projectStage : "Not Started"}
              </p>
            </div>

            {/* Delivery Status */}
            <div className={`border-l-4 p-4 rounded-r ${project?.projectStage === 'Delivered' ? 'border-l-green-500 bg-green-50 dark:bg-green-950' : 'border-l-gray-300 bg-gray-50 dark:bg-gray-950'}`}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className={`w-5 h-5 ${project?.projectStage === 'Delivered' ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                <p className="font-semibold text-foreground">Delivery</p>
              </div>
              <p className="text-sm text-muted-foreground">
                {project?.projectStage === 'Delivered' ? "Completed" : "In Progress"}
              </p>
            </div>
          </div>
        </Card>

        {/* Follow-Ups */}
        <Card className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Follow-Ups (Most Important)</h2>
          <Button size="sm" onClick={() => setIsFollowUpOpen(true)} data-testid="button-add-followup">
            <Plus className="w-4 h-4 mr-1" />
            New
          </Button>
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
          <Button size="sm" onClick={() => setIsRequirementOpen(true)} data-testid="button-add-requirement">
            <Plus className="w-4 h-4 mr-1" />
            {requirement ? "Edit" : "New"}
          </Button>
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
          <Button size="sm" onClick={() => setIsProposalOpen(true)} data-testid="button-add-proposal">
            <Plus className="w-4 h-4 mr-1" />
            {proposal ? "Edit" : "New"}
          </Button>
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
          <Button size="sm" onClick={() => setIsPaymentOpen(true)} data-testid="button-add-payment">
            <Plus className="w-4 h-4 mr-1" />
            {payment ? "Edit" : "New"}
          </Button>
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
          <Button size="sm" onClick={() => setIsProjectOpen(true)} data-testid="button-add-project">
            <Plus className="w-4 h-4 mr-1" />
            {project ? "Edit" : "New"}
          </Button>
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
    </div>
  );
}
