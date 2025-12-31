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
import { insertFollowUpSchema, type Client } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function FollowUpForm() {
  const { clientId } = useParams<{ clientId: string }>();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: client } = useQuery<Client>({
    queryKey: [`/api/crm/clients/${clientId}`],
  });

  const form = useForm({
    resolver: zodResolver(insertFollowUpSchema),
    defaultValues: {
      clientId: clientId!,
      followUpType: "Call",
      discussionNotes: "",
      status: "Pending",
      followUpDate: new Date().toISOString().split("T")[0],
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      return await apiRequest("POST", "/api/crm/follow-ups", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/crm/clients/${clientId}/follow-ups`] });
      toast({ title: "Follow-up recorded!" });
      navigate(`/crm/clients/${clientId}`);
    },
    onError: () => {
      toast({ title: "Failed to save follow-up", variant: "destructive" });
    },
  });

  function onSubmit(data: any) {
    mutation.mutate(data);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Record Follow-Up</h1>
      {client && <p className="text-secondary-foreground mb-6">{client.name}</p>}
      
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="followUpDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Follow-up Date *</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} data-testid="input-followup-date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="followUpType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Follow-up Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-followup-type">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Call">Call</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="Meeting">Meeting</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="discussionNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discussion Notes *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What did you discuss?" {...field} data-testid="input-discussion-notes" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-status">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Interested">Interested</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Confirmed">Confirmed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={mutation.isPending} className="w-full" data-testid="button-save-followup">
              {mutation.isPending ? "Saving..." : "Save Follow-Up"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
