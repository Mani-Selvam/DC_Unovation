import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertServiceInquirySchema,
  insertNewsletterSubscriptionSchema,
  insertContactSubmissionSchema,
  insertQuoteRequestSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/forms/quote", async (req, res) => {
    try {
      const data = insertQuoteRequestSchema.parse(req.body);
      const record = await storage.createQuoteRequest(data);
      res.json({ success: true, id: record.id });
    } catch (error) {
      console.error("Quote request error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.post("/api/forms/service-inquiry", async (req, res) => {
    try {
      const data = insertServiceInquirySchema.parse(req.body);
      
      const record = await storage.createServiceInquiry(data);
      
      res.json({ success: true, id: record.id });
    } catch (error) {
      console.error("Service inquiry error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.post("/api/forms/contact", async (req, res) => {
    try {
      const data = insertContactSubmissionSchema.parse(req.body);
      
      const record = await storage.createContactSubmission(data);
      
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
      
      res.json({ success: true, id: record.id });
    } catch (error) {
      console.error("Newsletter footer signup error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  // Admin routes
  app.post("/api/admin/login", async (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "admin123") {
      res.json({ success: true });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  app.get("/api/admin/data", async (_req, res) => {
    try {
      const serviceInquiries = await storage.getAllServiceInquiries();
      const newsletterSubscriptions = await storage.getAllNewsletterSubscriptions();
      const contactSubmissions = await storage.getAllContactSubmissions();
      const quoteRequests = await storage.getAllQuoteRequests();

      res.json({
        serviceInquiries,
        newsletterSubscriptions,
        contactSubmissions,
        quoteRequests,
      });
    } catch (error) {
      console.error("Admin data error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/admin/data/:type/:id", async (req, res) => {
    try {
      const { type, id } = req.params;
      
      switch (type) {
        case "inquiries":
          await storage.deleteServiceInquiry(id);
          break;
        case "newsletter":
          await storage.deleteNewsletterSubscription(id);
          break;
        case "contact":
          await storage.deleteContactSubmission(id);
          break;
        case "quotes":
          await storage.deleteQuoteRequest(id);
          break;
        default:
          return res.status(400).json({ error: "Invalid record type" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Admin delete error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
