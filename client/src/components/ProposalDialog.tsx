import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertProposalSchema, type Proposal } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProposalDialogProps {
  clientId: string;
  proposal?: Proposal;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProposalDialog({ clientId, proposal, open, onOpenChange }: ProposalDialogProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertProposalSchema),
    defaultValues: {
      clientId,
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
      onOpenChange(false);
    },
    onError: () => {
      toast({ title: "Failed to save proposal", variant: "destructive" });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{proposal ? "Update" : "Create"} Proposal</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="proposedService"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Proposed Service *</FormLabel>
                  <FormControl>
                    <Input placeholder="Web Design & Development" {...field} />
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
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
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
                    <Input placeholder="30 days, etc." {...field} />
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
                    <Textarea placeholder="Details..." {...field} />
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
                      <SelectTrigger>
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
            <Button type="submit" disabled={mutation.isPending} className="w-full">
              {mutation.isPending ? "Saving..." : "Save Proposal"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
