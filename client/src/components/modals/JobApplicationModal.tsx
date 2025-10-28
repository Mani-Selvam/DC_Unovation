import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getStoredUser } from "@/lib/googleAuth";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  role: z.string().min(1, "Role is required"),
  message: z.string().min(20, "Please tell us more about yourself (at least 20 characters)"),
});

type FormValues = z.infer<typeof formSchema>;

interface JobApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
    role: string;
    message: string;
  }) => Promise<void>;
}

export function JobApplicationModal({
  open,
  onOpenChange,
  onSubmit,
}: JobApplicationModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "General Application",
      message: "",
    },
  });

  useEffect(() => {
    if (open) {
      const user = getStoredUser();
      if (user) {
        form.reset({
          name: user.name,
          email: user.email,
          phone: form.getValues("phone") || "",
          role: form.getValues("role") || "General Application",
          message: form.getValues("message") || "",
        });
      }
    }
  }, [open, form]);

  const handleSubmit = async (data: FormValues) => {
    await onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" data-testid="modal-job-application">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">
            Apply for Position
          </DialogTitle>
          <DialogDescription>
            Join our team! Fill out the form below to apply
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 mt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your name"
                      {...field}
                      data-testid="input-job-name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      {...field}
                      data-testid="input-job-email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      {...field}
                      data-testid="input-job-phone"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Why do you want to join us?</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your experience and why you'd be a great fit..."
                      rows={4}
                      {...field}
                      data-testid="input-job-message"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="rounded-lg bg-muted/50 border border-border p-4">
              <p className="text-sm text-muted-foreground">
                Note: Resume upload will be available soon. For now, please include your LinkedIn profile or portfolio link in the message above.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
              data-testid="button-submit-job-application"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
