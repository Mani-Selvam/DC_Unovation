import { useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertPaymentSchema, type Client, type Payment } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";

export default function PaymentForm() {
  const { clientId } = useParams<{ clientId: string }>();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: client } = useQuery<Client>({
    queryKey: [`/api/crm/clients/${clientId}`],
  });

  const { data: payment } = useQuery<Payment>({
    queryKey: [`/api/crm/clients/${clientId}/payment`],
  });

  const form = useForm({
    resolver: zodResolver(insertPaymentSchema),
    defaultValues: {
      clientId: clientId!,
      totalAmount: payment?.totalAmount || 0,
      advancePaid: payment?.advancePaid || 0,
      balanceAmount: payment?.balanceAmount || 0,
      paymentMode: payment?.paymentMode || "Bank Transfer",
      paymentStatus: payment?.paymentStatus || "Pending",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (payment?.id) {
        return await apiRequest("PATCH", `/api/crm/clients/${clientId}/payment`, data);
      }
      return await apiRequest("POST", "/api/crm/payments", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/crm/clients/${clientId}/payment`] });
      toast({ title: "Payment tracked!" });
      navigate(`/crm/clients/${clientId}`);
    },
    onError: () => {
      toast({ title: "Failed to save payment", variant: "destructive" });
    },
  });

  function onSubmit(data: any) {
    const balance = data.totalAmount - data.advancePaid;
    mutation.mutate({ ...data, balanceAmount: balance });
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Track Payment</h1>
      {client && <p className="text-secondary-foreground mb-6">{client.name}</p>}
      
      <Card className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="totalAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Amount (₹) *</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="50000" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} data-testid="input-total" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="advancePaid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Advance Paid (₹)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} data-testid="input-advance" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="p-3 bg-secondary rounded text-sm">
              <p>Balance Amount: ₹{form.watch("totalAmount") - form.watch("advancePaid")}</p>
            </div>

            <FormField
              control={form.control}
              name="paymentMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Mode</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-payment-mode">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="UPI">UPI</SelectItem>
                      <SelectItem value="Cheque">Cheque</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Status *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger data-testid="select-payment-status">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Partial">Partial</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={mutation.isPending} className="w-full" data-testid="button-save-payment">
              {mutation.isPending ? "Saving..." : "Save Payment"}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
