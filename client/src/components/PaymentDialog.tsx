import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { insertPaymentSchema, type Payment } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface PaymentDialogProps {
  clientId: string;
  payment?: Payment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PaymentDialog({ clientId, payment, open, onOpenChange }: PaymentDialogProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(insertPaymentSchema),
    defaultValues: {
      clientId,
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
      onOpenChange(false);
    },
    onError: () => {
      toast({ title: "Failed to save payment", variant: "destructive" });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Track Payment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((data) => {
            const balance = data.totalAmount - data.advancePaid;
            mutation.mutate({ ...data, balanceAmount: balance });
          })} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="totalAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Amount (₹) *</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
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
                    <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} />
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
                      <SelectTrigger>
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
                      <SelectTrigger>
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
            <Button type="submit" disabled={mutation.isPending} className="w-full">
              {mutation.isPending ? "Saving..." : "Save Payment"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
