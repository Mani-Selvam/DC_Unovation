import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { forwardToN8n } from "./n8nClient";
import {
  insertLeadTrackingSchema,
  insertServiceInquirySchema,
  insertProjectInterestSchema,
  insertFeedbackSubmissionSchema,
  insertNewsletterSubscriptionSchema,
  insertJobApplicationSchema,
  insertContactSubmissionSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/forms/lead-tracking", async (req, res) => {
    try {
      const data = insertLeadTrackingSchema.parse(req.body);
      
      const record = await storage.createLeadTracking(data);
      
      await forwardToN8n("lead_cta_tracking", {
        page: data.page,
        action: data.action,
        name: data.name,
        email: data.email,
      });

      res.json({ success: true, id: record.id });
    } catch (error) {
      console.error("Lead tracking error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.post("/api/forms/service-inquiry", async (req, res) => {
    try {
      const data = insertServiceInquirySchema.parse(req.body);
      
      const record = await storage.createServiceInquiry(data);
      
      await forwardToN8n("service_inquiry_form", {
        name: data.name,
        email: data.email,
        service: data.service,
        message: data.message,
        page: data.page,
      });

      res.json({ success: true, id: record.id });
    } catch (error) {
      console.error("Service inquiry error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.post("/api/forms/project-interest", async (req, res) => {
    try {
      const data = insertProjectInterestSchema.parse(req.body);
      
      const record = await storage.createProjectInterest(data);
      
      await forwardToN8n("project_interest_tracking", {
        project: data.project,
        name: data.name,
        email: data.email,
        message: data.message,
        page: data.page,
      });

      res.json({ success: true, id: record.id });
    } catch (error) {
      console.error("Project interest error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.post("/api/forms/feedback", async (req, res) => {
    try {
      const data = insertFeedbackSubmissionSchema.parse(req.body);
      
      const record = await storage.createFeedbackSubmission(data);
      
      await forwardToN8n("feedback_submission", {
        name: data.name,
        email: data.email,
        rating: data.rating,
        message: data.message,
      });

      res.json({ success: true, id: record.id });
    } catch (error) {
      console.error("Feedback submission error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.post("/api/forms/newsletter", async (req, res) => {
    try {
      const data = insertNewsletterSubscriptionSchema.parse(req.body);
      
      const record = await storage.createNewsletterSubscription(data);
      
      await forwardToN8n("newsletter_subscription", {
        email: data.email,
        name: data.name,
        source: data.source,
      });

      res.json({ success: true, id: record.id });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.post("/api/forms/job-application", async (req, res) => {
    try {
      const data = insertJobApplicationSchema.parse(req.body);
      
      const record = await storage.createJobApplication(data);
      
      await forwardToN8n("job_applications_submission", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
        message: data.message,
        resumeFileName: data.resumeFileName,
      });

      res.json({ success: true, id: record.id });
    } catch (error) {
      console.error("Job application error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.post("/api/forms/contact", async (req, res) => {
    try {
      const data = insertContactSubmissionSchema.parse(req.body);
      
      const record = await storage.createContactSubmission(data);
      
      await forwardToN8n("context_form_submission", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        page: data.page,
      });

      res.json({ success: true, id: record.id });
    } catch (error) {
      console.error("Contact submission error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.post("/api/forms/newsletter-footer", async (req, res) => {
    try {
      const data = insertNewsletterSubscriptionSchema.parse({
        ...req.body,
        source: "footer",
      });
      
      const record = await storage.createNewsletterSubscription(data);
      
      await forwardToN8n("newsletter_footer_signup", {
        email: data.email,
        source: "footer",
      });

      res.json({ success: true, id: record.id });
    } catch (error) {
      console.error("Newsletter footer signup error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
