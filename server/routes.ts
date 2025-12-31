import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertServiceInquirySchema,
  insertNewsletterSubscriptionSchema,
  insertContactSubmissionSchema,
  insertQuoteRequestSchema,
  insertClientSchema,
  insertFollowUpSchema,
  insertRequirementSchema,
  insertProposalSchema,
  insertPaymentSchema,
  insertProjectSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // CRM Routes
  
  // Client routes
  app.post("/api/crm/clients", async (req, res) => {
    try {
      const data = insertClientSchema.parse(req.body);
      const client = await storage.createClient(data);
      res.json({ success: true, client });
    } catch (error) {
      console.error("Create client error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.get("/api/crm/clients", async (_req, res) => {
    try {
      const clients = await storage.getAllClients();
      res.json(clients);
    } catch (error) {
      console.error("Get clients error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/crm/clients/:id", async (req, res) => {
    try {
      const client = await storage.getClient(req.params.id);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.json(client);
    } catch (error) {
      console.error("Get client error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/crm/clients/:id", async (req, res) => {
    try {
      const data = insertClientSchema.partial().parse(req.body);
      const client = await storage.updateClient(req.params.id, data);
      if (!client) {
        return res.status(404).json({ error: "Client not found" });
      }
      res.json({ success: true, client });
    } catch (error) {
      console.error("Update client error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.delete("/api/crm/clients/:id", async (req, res) => {
    try {
      await storage.deleteClient(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete client error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Follow-up routes
  app.post("/api/crm/follow-ups", async (req, res) => {
    try {
      const data = insertFollowUpSchema.parse(req.body);
      const followUp = await storage.createFollowUp(data);
      res.json({ success: true, followUp });
    } catch (error) {
      console.error("Create follow-up error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.get("/api/crm/clients/:clientId/follow-ups", async (req, res) => {
    try {
      const followUps = await storage.getFollowUpsByClient(req.params.clientId);
      res.json(followUps);
    } catch (error) {
      console.error("Get follow-ups error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/crm/follow-ups/:id", async (req, res) => {
    try {
      const data = insertFollowUpSchema.partial().parse(req.body);
      const followUp = await storage.updateFollowUp(req.params.id, data);
      if (!followUp) {
        return res.status(404).json({ error: "Follow-up not found" });
      }
      res.json({ success: true, followUp });
    } catch (error) {
      console.error("Update follow-up error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.delete("/api/crm/follow-ups/:id", async (req, res) => {
    try {
      await storage.deleteFollowUp(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Delete follow-up error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Requirement routes
  app.post("/api/crm/requirements", async (req, res) => {
    try {
      const data = insertRequirementSchema.parse(req.body);
      const requirement = await storage.createRequirement(data);
      res.json({ success: true, requirement });
    } catch (error) {
      console.error("Create requirement error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.get("/api/crm/clients/:clientId/requirement", async (req, res) => {
    try {
      const requirement = await storage.getRequirement(req.params.clientId);
      res.json(requirement || {});
    } catch (error) {
      console.error("Get requirement error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/crm/clients/:clientId/requirement", async (req, res) => {
    try {
      const data = insertRequirementSchema.partial().parse(req.body);
      const requirement = await storage.updateRequirement(req.params.clientId, data);
      res.json({ success: true, requirement });
    } catch (error) {
      console.error("Update requirement error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  // Proposal routes
  app.post("/api/crm/proposals", async (req, res) => {
    try {
      const data = insertProposalSchema.parse(req.body);
      const proposal = await storage.createProposal(data);
      res.json({ success: true, proposal });
    } catch (error) {
      console.error("Create proposal error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.get("/api/crm/clients/:clientId/proposal", async (req, res) => {
    try {
      const proposal = await storage.getProposal(req.params.clientId);
      res.json(proposal || {});
    } catch (error) {
      console.error("Get proposal error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/crm/clients/:clientId/proposal", async (req, res) => {
    try {
      const data = insertProposalSchema.partial().parse(req.body);
      const proposal = await storage.updateProposal(req.params.clientId, data);
      res.json({ success: true, proposal });
    } catch (error) {
      console.error("Update proposal error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  // Payment routes
  app.post("/api/crm/payments", async (req, res) => {
    try {
      const data = insertPaymentSchema.parse(req.body);
      const payment = await storage.createPayment(data);
      res.json({ success: true, payment });
    } catch (error) {
      console.error("Create payment error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.get("/api/crm/clients/:clientId/payment", async (req, res) => {
    try {
      const payment = await storage.getPayment(req.params.clientId);
      res.json(payment || {});
    } catch (error) {
      console.error("Get payment error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/crm/clients/:clientId/payment", async (req, res) => {
    try {
      const data = insertPaymentSchema.partial().parse(req.body);
      const payment = await storage.updatePayment(req.params.clientId, data);
      res.json({ success: true, payment });
    } catch (error) {
      console.error("Update payment error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  // Project routes
  app.post("/api/crm/projects", async (req, res) => {
    try {
      const data = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(data);
      res.json({ success: true, project });
    } catch (error) {
      console.error("Create project error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  app.get("/api/crm/clients/:clientId/project", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.clientId);
      res.json(project || {});
    } catch (error) {
      console.error("Get project error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/crm/clients/:clientId/project", async (req, res) => {
    try {
      const data = insertProjectSchema.partial().parse(req.body);
      const project = await storage.updateProject(req.params.clientId, data);
      res.json({ success: true, project });
    } catch (error) {
      console.error("Update project error:", error);
      res.status(400).json({ error: "Invalid request" });
    }
  });

  // Website form routes
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
