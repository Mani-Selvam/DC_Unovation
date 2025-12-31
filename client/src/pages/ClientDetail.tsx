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
        <Card className="p-8 mb-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950 dark:via-indigo-950 dark:to-purple-950 border border-blue-200 dark:border-blue-800">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{client.name}</h1>
              <p className="text-sm text-muted-foreground">Client Profile & Project Status</p>
            </div>
            <Badge className="bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 whitespace-nowrap">Active</Badge>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="flex items-center gap-4 p-3 rounded-lg bg-white/50 dark:bg-black/20">
              <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900">
                <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Phone</p>
                <p className="text-sm font-semibold text-foreground truncate">{client.phone}</p>
              </div>
            </div>
            {client.email && (
              <div className="flex items-center gap-4 p-3 rounded-lg bg-white/50 dark:bg-black/20">
                <div className="p-2 rounded-md bg-purple-100 dark:bg-purple-900">
                  <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Email</p>
                  <p className="text-sm font-semibold text-foreground truncate">{client.email}</p>
                </div>
              </div>
            )}
            {client.company && (
              <div className="flex items-center gap-4 p-3 rounded-lg bg-white/50 dark:bg-black/20">
                <div className="p-2 rounded-md bg-orange-100 dark:bg-orange-900">
                  <Building2 className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Company</p>
                  <p className="text-sm font-semibold text-foreground truncate">{client.company}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-4 p-3 rounded-lg bg-white/50 dark:bg-black/20">
              <div className="p-2 rounded-md bg-teal-100 dark:bg-teal-900">
                <Hammer className="w-5 h-5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Service</p>
                <p className="text-sm font-semibold text-foreground truncate">{client.serviceNeeded}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Progress Pipeline */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Project Pipeline</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {/* Follow-Up Status */}
            <div className="group p-5 rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950 dark:to-blue-900/50 hover-elevate transition-all">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/50">
                  <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="font-semibold text-sm text-foreground">Follow-Ups</p>
                <p className="text-xs text-muted-foreground font-medium">
                  {followUps.length === 0 ? "No follow-ups" : `${followUps.length}`}
                </p>
              </div>
            </div>

            {/* Requirement Status */}
            <div className={`group p-5 rounded-lg border-2 transition-all hover-elevate ${requirement ? 'border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950 dark:to-green-900/50' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950'}`}>
              <div className="flex flex-col items-center text-center gap-2">
                <div className={`p-3 rounded-lg ${requirement ? 'bg-green-100 dark:bg-green-900/50' : 'bg-gray-200 dark:bg-gray-800'}`}>
                  <FileText className={`w-5 h-5 ${requirement ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`} />
                </div>
                <p className="font-semibold text-sm text-foreground">Requirements</p>
                <p className="text-xs text-muted-foreground font-medium">
                  {requirement ? "Collected" : "Pending"}
                </p>
              </div>
            </div>

            {/* Proposal Status */}
            <div className={`group p-5 rounded-lg border-2 transition-all hover-elevate ${proposal ? 'border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950 dark:to-purple-900/50' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950'}`}>
              <div className="flex flex-col items-center text-center gap-2">
                <div className={`p-3 rounded-lg ${proposal ? 'bg-purple-100 dark:bg-purple-900/50' : 'bg-gray-200 dark:bg-gray-800'}`}>
                  <FileText className={`w-5 h-5 ${proposal ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500'}`} />
                </div>
                <p className="font-semibold text-sm text-foreground">Proposal</p>
                <p className="text-xs text-muted-foreground font-medium">
                  {proposal ? "Created" : "Pending"}
                </p>
              </div>
            </div>

            {/* Payment Status */}
            <div className={`group p-5 rounded-lg border-2 transition-all hover-elevate ${payment ? 'border-emerald-200 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950 dark:to-emerald-900/50' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950'}`}>
              <div className="flex flex-col items-center text-center gap-2">
                <div className={`p-3 rounded-lg ${payment ? 'bg-emerald-100 dark:bg-emerald-900/50' : 'bg-gray-200 dark:bg-gray-800'}`}>
                  <CreditCard className={`w-5 h-5 ${payment ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-500'}`} />
                </div>
                <p className="font-semibold text-sm text-foreground">Payment</p>
                <p className="text-xs text-muted-foreground font-medium">
                  {payment ? payment.balanceAmount === 0 ? "Completed" : "In Progress" : "Pending"}
                </p>
              </div>
            </div>

            {/* Project Status */}
            <div className={`group p-5 rounded-lg border-2 transition-all hover-elevate ${project ? 'border-orange-200 dark:border-orange-800 bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950 dark:to-orange-900/50' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950'}`}>
              <div className="flex flex-col items-center text-center gap-2">
                <div className={`p-3 rounded-lg ${project ? 'bg-orange-100 dark:bg-orange-900/50' : 'bg-gray-200 dark:bg-gray-800'}`}>
                  <Hammer className={`w-5 h-5 ${project ? 'text-orange-600 dark:text-orange-400' : 'text-gray-500'}`} />
                </div>
                <p className="font-semibold text-sm text-foreground">Project</p>
                <p className="text-xs text-muted-foreground font-medium">
                  {project ? project.projectStage : "Not Started"}
                </p>
              </div>
            </div>

            {/* Delivery Status */}
            <div className={`group p-5 rounded-lg border-2 transition-all hover-elevate ${project?.projectStage === 'Delivered' ? 'border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950 dark:to-green-900/50' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950'}`}>
              <div className="flex flex-col items-center text-center gap-2">
                <div className={`p-3 rounded-lg ${project?.projectStage === 'Delivered' ? 'bg-green-100 dark:bg-green-900/50' : 'bg-gray-200 dark:bg-gray-800'}`}>
                  <CheckCircle2 className={`w-5 h-5 ${project?.projectStage === 'Delivered' ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`} />
                </div>
                <p className="font-semibold text-sm text-foreground">Delivery</p>
                <p className="text-xs text-muted-foreground font-medium">
                  {project?.projectStage === 'Delivered' ? "Completed" : "In Progress"}
                </p>
              </div>
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
              <div key={fu.id} className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover-elevate transition-all bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-950 dark:to-gray-900/50">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100">{fu.followUpType}</Badge>
                    <Badge variant="outline">{fu.status}</Badge>
                  </div>
                </div>
                <p className="text-sm text-foreground">{fu.discussionNotes}</p>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Requirements */}
      <Card className="p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Requirements</h2>
          <Button size="sm" onClick={() => setIsRequirementOpen(true)} data-testid="button-add-requirement">
            <Plus className="w-4 h-4 mr-1" />
            {requirement ? "Edit" : "New"}
          </Button>
        </div>
        {requirement ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {requirement.websiteType && (
              <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-950 dark:to-gray-900/50">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Website Type</p>
                <p className="text-sm font-semibold text-foreground">{requirement.websiteType}</p>
              </div>
            )}
            {requirement.pagesNeeded && (
              <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-950 dark:to-gray-900/50">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Pages Needed</p>
                <p className="text-sm font-semibold text-foreground">{requirement.pagesNeeded}</p>
              </div>
            )}
            {requirement.budgetRange && (
              <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-950 dark:to-gray-900/50">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Budget Range</p>
                <p className="text-sm font-semibold text-foreground">{requirement.budgetRange}</p>
              </div>
            )}
            {requirement.deadline && (
              <div className="p-4 rounded-lg border-2 border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50 to-red-100/30 dark:from-red-950 dark:to-red-900/30">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Deadline</p>
                <p className="text-sm font-semibold text-red-600 dark:text-red-400">
                  {requirement.deadline instanceof Date 
                    ? requirement.deadline.toLocaleDateString('en-IN')
                    : new Date(requirement.deadline as string).toLocaleDateString('en-IN')}
                </p>
              </div>
            )}
            {requirement.features && (
              <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-950 dark:to-gray-900/50 md:col-span-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Features</p>
                <p className="text-sm text-foreground">{requirement.features}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-secondary-foreground">Not collected yet.</p>
        )}
      </Card>


      {/* Proposal */}
      <Card className="p-8 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Proposal</h2>
          <Button size="sm" onClick={() => setIsProposalOpen(true)} data-testid="button-add-proposal">
            <Plus className="w-4 h-4 mr-1" />
            {proposal ? "Edit" : "New"}
          </Button>
        </div>
        {proposal ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border-l-4 border-l-purple-500 bg-purple-50/50 dark:bg-purple-950/30">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide font-medium mb-1">Proposed Service</p>
                <p className="text-lg font-semibold text-foreground">{proposal.proposedService}</p>
              </div>
              <Badge className="bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 whitespace-nowrap">{proposal.proposalStatus}</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {proposal.price && (
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-950 dark:to-gray-900/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Proposed Price</p>
                  <p className="text-2xl font-bold text-foreground">₹{(proposal.price || 0).toLocaleString('en-IN')}</p>
                </div>
              )}
              {proposal.timeline && (
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-950 dark:to-gray-900/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-1">Estimated Timeline</p>
                  <p className="text-lg font-semibold text-foreground">{proposal.timeline}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-secondary-foreground">Not created yet.</p>
        )}
      </Card>

      {/* Payment */}
      <Card className="p-8 mb-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-bold">Payment</h2>
            <p className="text-xs text-muted-foreground mt-1">Timeline & Financial Tracking</p>
          </div>
          <Button size="sm" onClick={() => setIsPaymentOpen(true)} data-testid="button-add-payment">
            <Plus className="w-4 h-4 mr-1" />
            {payment ? "Edit" : "New"}
          </Button>
        </div>
        {payment ? (
          <div className="space-y-6">
            {/* Timeline */}
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Timeline</p>
              <div className="flex gap-2 text-sm">
                <Badge variant="outline" className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">{payment.paymentStatus}</Badge>
              </div>
            </div>

            {/* Financial Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Total Amount */}
              <div className="p-5 rounded-lg border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-blue-100/30 dark:from-blue-950 dark:to-blue-900/30">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">Total Amount</p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">₹{(payment.totalAmount || 0).toLocaleString('en-IN')}</p>
              </div>

              {/* Advance Paid */}
              <div className="p-5 rounded-lg border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-green-100/30 dark:from-green-950 dark:to-green-900/30">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">Advance Paid</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹{(payment.advancePaid || 0).toLocaleString('en-IN')}</p>
              </div>

              {/* Balance Remaining */}
              <div className="p-5 rounded-lg border-2 border-orange-200 dark:border-orange-800 bg-gradient-to-br from-orange-50 to-orange-100/30 dark:from-orange-950 dark:to-orange-900/30">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">Balance Due</p>
                <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">₹{(payment.balanceAmount || 0).toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* Payment Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-foreground">Payment Progress</p>
                <p className="text-sm font-semibold text-muted-foreground">
                  {payment.totalAmount > 0 ? Math.round((payment.advancePaid / payment.totalAmount) * 100) : 0}%
                </p>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5">
                <div 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full transition-all duration-300"
                  style={{ width: `${payment.totalAmount > 0 ? (payment.advancePaid / payment.totalAmount) * 100 : 0}%` }}
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Payment Mode:</span> {payment.paymentMode}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-secondary-foreground">Not tracked yet.</p>
        )}
      </Card>

      {/* Project */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Project Status</h2>
          <Button size="sm" onClick={() => setIsProjectOpen(true)} data-testid="button-add-project">
            <Plus className="w-4 h-4 mr-1" />
            {project ? "Edit" : "New"}
          </Button>
        </div>
        {project ? (
          <div className="space-y-4">
            <div className="p-5 rounded-lg border-l-4 border-l-orange-500 bg-orange-50/50 dark:bg-orange-950/30">
              <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">Current Stage</p>
              <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100">{project.projectStage}</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.lastUpdate && (
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-950 dark:to-gray-900/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">Last Update</p>
                  <p className="text-sm text-foreground">{project.lastUpdate}</p>
                </div>
              )}
              {project.expectedDeliveryDate && (
                <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-950 dark:to-gray-900/50">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">Expected Delivery</p>
                  <p className="text-sm text-foreground">{new Date(project.expectedDeliveryDate).toLocaleDateString('en-IN')}</p>
                </div>
              )}
            </div>

            {project.nextAction && (
              <div className="p-4 rounded-lg border border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-green-100/30 dark:from-green-950 dark:to-green-900/30">
                <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium mb-2">Next Action</p>
                <p className="text-sm font-medium text-foreground">{project.nextAction}</p>
              </div>
            )}
          </div>
        ) : (
          <p className="text-secondary-foreground">Not created yet.</p>
        )}
      </Card>
      </div>
    </div>
  );
}
