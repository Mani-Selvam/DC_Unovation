import { db } from "./db";
import {
  serviceInquiries,
  newsletterSubscriptions,
  contactSubmissions,
  quoteRequests,
  admins,
  type ServiceInquiry,
  type InsertServiceInquiry,
  type NewsletterSubscription,
  type InsertNewsletterSubscription,
  type ContactSubmission,
  type InsertContactSubmission,
  type QuoteRequest,
  type InsertQuoteRequest,
  type Admin,
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  createServiceInquiry(data: InsertServiceInquiry): Promise<ServiceInquiry>;
  createNewsletterSubscription(data: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission>;
  createQuoteRequest(data: InsertQuoteRequest): Promise<QuoteRequest>;
  
  // Admin methods
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  getAllServiceInquiries(): Promise<ServiceInquiry[]>;
  getAllNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
  getAllContactSubmissions(): Promise<ContactSubmission[]>;
  getAllQuoteRequests(): Promise<QuoteRequest[]>;

  // CRM Leads
  createLead(lead: InsertLead): Promise<Lead>;
  getAllLeads(): Promise<Lead[]>;
  updateLeadStatus(id: string, status: string): Promise<Lead>;
  deleteLead(id: string): Promise<void>;

  // CRM methods
  updateServiceInquiryStatus(id: string, status: string, notes?: string): Promise<ServiceInquiry>;
  updateQuoteRequestStatus(id: string, status: string, notes?: string): Promise<QuoteRequest>;

  // Delete methods
  deleteServiceInquiry(id: string): Promise<void>;
  deleteNewsletterSubscription(id: string): Promise<void>;
  deleteContactSubmission(id: string): Promise<void>;
  deleteQuoteRequest(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async createServiceInquiry(data: InsertServiceInquiry): Promise<ServiceInquiry> {
    const [record] = await db
      .insert(serviceInquiries)
      .values(data)
      .returning();
    return record;
  }

  async createNewsletterSubscription(data: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const [record] = await db
      .insert(newsletterSubscriptions)
      .values(data)
      .returning();
    return record;
  }

  async createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission> {
    const [record] = await db
      .insert(contactSubmissions)
      .values(data)
      .returning();
    return record;
  }

  async createQuoteRequest(data: InsertQuoteRequest): Promise<QuoteRequest> {
    const [record] = await db
      .insert(quoteRequests)
      .values(data)
      .returning();
    return record;
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins).where(eq(admins.username, username));
    return admin;
  }

  async getAllServiceInquiries(): Promise<ServiceInquiry[]> {
    return await db.select().from(serviceInquiries);
  }

  async getAllNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return await db.select().from(newsletterSubscriptions);
  }

  async getAllContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions);
  }

  async getAllQuoteRequests(): Promise<QuoteRequest[]> {
    return await db.select().from(quoteRequests);
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [record] = await db.insert(leads).values(lead).returning();
    return record;
  }

  async getAllLeads(): Promise<Lead[]> {
    return await db.select().from(leads);
  }

  async updateLeadStatus(id: string, status: string): Promise<Lead> {
    const [record] = await db
      .update(leads)
      .set({ status })
      .where(eq(leads.id, id))
      .returning();
    return record;
  }

  async deleteLead(id: string): Promise<void> {
    await db.delete(leads).where(eq(leads.id, id));
  }

  async updateServiceInquiryStatus(id: string, status: string, notes?: string): Promise<ServiceInquiry> {
    const [record] = await db
      .update(serviceInquiries)
      .set({ status, notes })
      .where(eq(serviceInquiries.id, id))
      .returning();
    return record;
  }

  async updateQuoteRequestStatus(id: string, status: string, notes?: string): Promise<QuoteRequest> {
    const [record] = await db
      .update(quoteRequests)
      .set({ status, notes })
      .where(eq(quoteRequests.id, id))
      .returning();
    return record;
  }

  async deleteServiceInquiry(id: string): Promise<void> {
    await db.delete(serviceInquiries).where(eq(serviceInquiries.id, id));
  }

  async deleteNewsletterSubscription(id: string): Promise<void> {
    await db.delete(newsletterSubscriptions).where(eq(newsletterSubscriptions.id, id));
  }

  async deleteContactSubmission(id: string): Promise<void> {
    await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
  }

  async deleteQuoteRequest(id: string): Promise<void> {
    await db.delete(quoteRequests).where(eq(quoteRequests.id, id));
  }
}

export const storage = new DatabaseStorage();
