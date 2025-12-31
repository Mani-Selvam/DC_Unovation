import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { insertRequirementSchema, type Requirement } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface RequirementDialogProps {
  clientId: string;
  requirement?: Requirement;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function RequirementDialog({ clientId, requirement, open, onOpenChange }: RequirementDialogProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertRequirementSchema),
    defaultValues: {
      clientId,
      websiteType: requirement?.websiteType || "",
      pagesNeeded: requirement?.pagesNeeded || "",
      features: requirement?.features || "",
      referenceWebsites: requirement?.referenceWebsites || "",
      budgetRange: requirement?.budgetRange || "",
      deadline: requirement?.deadline ? new Date(requirement.deadline).toISOString().split('T')[0] : "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (requirement?.id) {
        return await apiRequest("PATCH", `/api/crm/clients/${clientId}/requirement`, data);
      }
      return await apiRequest("POST", "/api/crm/requirements", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/crm/clients/${clientId}/requirement`] });
      toast({ title: "Requirements saved!" });
      onOpenChange(false);
    },
    onError: () => {
      toast({ title: "Failed to save requirements", variant: "destructive" });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Collect Requirements</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="websiteType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website Type</FormLabel>
                  <FormControl>
                    <Input placeholder="E-commerce, Portfolio, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pagesNeeded"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pages Needed</FormLabel>
                  <FormControl>
                    <Input placeholder="Home, About, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features Required</FormLabel>
                  <FormControl>
                    <Textarea placeholder="List features..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budgetRange"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Range</FormLabel>
                  <FormControl>
                    <Input placeholder="₹10000 - ₹50000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline</FormLabel>
                  <FormControl>
                    <Input 
                      type="date" 
                      {...field} 
                      onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={mutation.isPending} className="w-full">
              {mutation.isPending ? "Saving..." : "Save Requirements"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
