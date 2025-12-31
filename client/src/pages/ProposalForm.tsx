import { useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertProposalSchema, type Client, type Proposal } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function ProposalForm() {
  const { clientId } = useParams<{ clientId: string }>();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: client } = useQuery<Client>({
    queryKey: [`/api/crm/clients/${clientId}`],
  });

  const { data: proposal } = useQuery<Proposal>({
    queryKey: [`/api/crm/clients/${clientId}/proposal`],
  });

  const form = useForm({
    resolver: zodResolver(insertProposalSchema),
    defaultValues: {
      clientId: clientId!,
      proposedService: proposal?.proposedService || "",
      price: proposal?.price || 0,
      timeline: proposal?.timeline || "",
      notes: proposal?.notes || "",
      proposalStatus: proposal?.proposalStatus || "Sent",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (proposal?.id) {
        return await apiRequest("PATCH", `/api/crm/clients/${clientId}/proposal`, data);
      }
      return await apiRequest("POST", "/api/crm/proposals", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/crm/clients/${clientId}/proposal`] });
      toast({ title: "Proposal saved!" });
      navigate(`/admin/dashboard/crm/clients/${clientId}`);
    },
    onError: () => {
      toast({ title: "Failed to save proposal", variant: "destructive" });
    },
  });

  function onSubmit(data: any) {
    mutation.mutate(data);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Create Proposal</h1>
      {client && <p className="text-secondary-foreground mb-6">{client.name}</p>}
      
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="proposedService"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proposed Service *</FormLabel>
                  <FormControl>
                    <Input placeholder="Web Design & Development" {...field} data-testid="input-service" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (in ₹) *</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="50000" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} data-testid="input-price" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timeline *</FormLabel>
                  <FormControl>
                    <Input placeholder="30 days, 2 weeks, etc." {...field} data-testid="input-timeline" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any additional details..." {...field} data-testid="input-notes" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="proposalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proposal Status *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-proposal-status">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Sent">Sent</SelectItem>
                      <SelectItem value="Accepted">Accepted</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={mutation.isPending} className="w-full" data-testid="button-save-proposal">
              {mutation.isPending ? "Saving..." : "Save Proposal"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
