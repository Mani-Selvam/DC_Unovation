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
}

export const storage = new DatabaseStorage();
