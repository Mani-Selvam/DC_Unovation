import { db } from "./db";
import {
  serviceInquiries,
  newsletterSubscriptions,
  contactSubmissions,
  quoteRequests,
  type ServiceInquiry,
  type InsertServiceInquiry,
  type NewsletterSubscription,
  type InsertNewsletterSubscription,
  type ContactSubmission,
  type InsertContactSubmission,
  type QuoteRequest,
  type InsertQuoteRequest,
} from "@shared/schema";

export interface IStorage {
  createServiceInquiry(data: InsertServiceInquiry): Promise<ServiceInquiry>;
  createNewsletterSubscription(data: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission>;
  createQuoteRequest(data: InsertQuoteRequest): Promise<QuoteRequest>;
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
}

export const storage = new DatabaseStorage();
