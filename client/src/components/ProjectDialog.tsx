import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertProjectSchema, type Project } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ProjectDialogProps {
  clientId: string;
  project?: Project;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDialog({ clientId, project, open, onOpenChange }: ProjectDialogProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertProjectSchema),
    defaultValues: {
      clientId,
      projectStage: project?.projectStage || "Design",
      lastUpdate: project?.lastUpdate || "",
      nextAction: project?.nextAction || "",
      expectedDeliveryDate: project?.expectedDeliveryDate ? new Date(project.expectedDeliveryDate).toISOString().split('T')[0] : "",
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
      onOpenChange(false);
    },
    onError: () => {
      toast({ title: "Failed to update project", variant: "destructive" });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Update Project Status</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="projectStage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Stage *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
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
                    <Textarea placeholder="What was done..." {...field} />
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
                    <Textarea placeholder="Next steps..." {...field} />
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
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={mutation.isPending} className="w-full">
              {mutation.isPending ? "Saving..." : "Save Project Status"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
