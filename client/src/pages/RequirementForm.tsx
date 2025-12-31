import { useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { insertRequirementSchema, type Client, type Requirement } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function RequirementForm() {
  const { clientId } = useParams<{ clientId: string }>();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: client } = useQuery<Client>({
    queryKey: [`/api/crm/clients/${clientId}`],
  });

  const { data: requirement } = useQuery<Requirement>({
    queryKey: [`/api/crm/clients/${clientId}/requirement`],
  });

  const form = useForm({
    resolver: zodResolver(insertRequirementSchema),
    defaultValues: {
      clientId: clientId!,
      websiteType: requirement?.websiteType || "",
      pagesNeeded: requirement?.pagesNeeded || "",
      features: requirement?.features || "",
      referenceWebsites: requirement?.referenceWebsites || "",
      budgetRange: requirement?.budgetRange || "",
      deadline: requirement?.deadline || "",
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
      navigate(`/admin/dashboard/crm/clients/${clientId}`);
    },
    onError: () => {
      toast({ title: "Failed to save requirements", variant: "destructive" });
    },
  });

  function onSubmit(data: any) {
    mutation.mutate(data);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Collect Requirements</h1>
      {client && <p className="text-secondary-foreground mb-6">{client.name}</p>}
      
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="websiteType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website Type</FormLabel>
                  <FormControl>
                    <Input placeholder="E-commerce, Blog, Portfolio, etc." {...field} data-testid="input-website-type" />
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
                    <Input placeholder="Home, About, Services, Contact, etc." {...field} data-testid="input-pages" />
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
                    <Textarea placeholder="List required features..." {...field} data-testid="input-features" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="referenceWebsites"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference Websites</FormLabel>
                  <FormControl>
                    <Input placeholder="URLs of reference websites..." {...field} data-testid="input-references" />
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
                    <Input placeholder="₹10000 - ₹50000" {...field} data-testid="input-budget" />
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
                      value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                      onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                      data-testid="input-deadline" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={mutation.isPending} className="w-full" data-testid="button-save-requirements">
              {mutation.isPending ? "Saving..." : "Save Requirements"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
