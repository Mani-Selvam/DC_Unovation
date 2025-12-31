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
import { insertProjectSchema, type Client, type Project } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function ProjectForm() {
  const { clientId } = useParams<{ clientId: string }>();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: client } = useQuery<Client>({
    queryKey: [`/api/crm/clients/${clientId}`],
  });

  const { data: project } = useQuery<Project>({
    queryKey: [`/api/crm/clients/${clientId}/project`],
  });

  const form = useForm({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      clientId: clientId!,
      projectStage: project?.projectStage || "Design",
      lastUpdate: project?.lastUpdate || "",
      nextAction: project?.nextAction || "",
      expectedDeliveryDate: project?.expectedDeliveryDate || "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (project?.id) {
        return await apiRequest("PATCH", `/api/crm/clients/${clientId}/project`, data);
      }
      return await apiRequest("POST", "/api/crm/projects", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/crm/clients/${clientId}/project`] });
      toast({ title: "Project updated!" });
      navigate(`/crm/clients/${clientId}`);
    },
    onError: () => {
      toast({ title: "Failed to update project", variant: "destructive" });
    },
  });

  function onSubmit(data: any) {
    mutation.mutate(data);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Update Project Status</h1>
      {client && <p className="text-secondary-foreground mb-6">{client.name}</p>}
      
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="projectStage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Stage *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-project-stage">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Development">Development</SelectItem>
                      <SelectItem value="Review">Review</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastUpdate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Update</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What was done..." {...field} data-testid="input-last-update" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nextAction"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Next Action</FormLabel>
                  <FormControl>
                    <Textarea placeholder="What needs to be done next..." {...field} data-testid="input-next-action" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expectedDeliveryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Delivery Date</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      {...field}
                      value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                      onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                      data-testid="input-delivery-date" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={mutation.isPending} className="w-full" data-testid="button-save-project">
              {mutation.isPending ? "Saving..." : "Save Project Status"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
