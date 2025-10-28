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
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ProjectInterestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectTitle: string;
  onSubmit: (data: {
    project: string;
    name: string;
    email: string;
    message?: string;
  }) => Promise<void>;
}

export function ProjectInterestModal({
  open,
  onOpenChange,
  projectTitle,
  onSubmit,
}: ProjectInterestModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
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
          message: form.getValues("message") || "",
        });
      }
    }
  }, [open, form]);

  const handleSubmit = async (data: FormValues) => {
    await onSubmit({
      project: projectTitle,
      ...data,
    });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" data-testid="modal-project-interest">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">
            Project Inquiry
          </DialogTitle>
          <DialogDescription>
            Interested in "{projectTitle}"? Let's discuss your similar project
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
                      data-testid="input-project-name"
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
                      data-testid="input-project-email"
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
                  <FormLabel>Additional Details (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us more about your project requirements..."
                      rows={4}
                      {...field}
                      data-testid="input-project-message"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
              data-testid="button-submit-project-interest"
            >
              {form.formState.isSubmitting ? "Submitting..." : "Submit Inquiry"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
