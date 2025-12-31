import { db } from "./db";
import {
  serviceInquiries,
  newsletterSubscriptions,
  contactSubmissions,
  quoteRequests,
  admins,
  clients,
  followUps,
  requirements,
  proposals,
  payments,
  projects,
  type ServiceInquiry,
  type InsertServiceInquiry,
  type NewsletterSubscription,
  type InsertNewsletterSubscription,
  type ContactSubmission,
  type InsertContactSubmission,
  type QuoteRequest,
  type InsertQuoteRequest,
  type Admin,
  type Client,
  type InsertClient,
  type FollowUp,
  type InsertFollowUp,
  type Requirement,
  type InsertRequirement,
  type Proposal,
  type InsertProposal,
  type Payment,
  type InsertPayment,
  type Project,
  type InsertProject,
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // CRM methods
  createClient(data: InsertClient): Promise<Client>;
  getClient(id: string): Promise<Client | undefined>;
  getAllClients(): Promise<Client[]>;
  updateClient(id: string, data: Partial<InsertClient>): Promise<Client | undefined>;
  deleteClient(id: string): Promise<void>;

  createFollowUp(data: InsertFollowUp): Promise<FollowUp>;
  getFollowUpsByClient(clientId: string): Promise<FollowUp[]>;
  updateFollowUp(id: string, data: Partial<InsertFollowUp>): Promise<FollowUp | undefined>;
  deleteFollowUp(id: string): Promise<void>;

  createRequirement(data: InsertRequirement): Promise<Requirement>;
  getRequirement(clientId: string): Promise<Requirement | undefined>;
  updateRequirement(clientId: string, data: Partial<InsertRequirement>): Promise<Requirement | undefined>;
  deleteRequirement(id: string): Promise<void>;

  createProposal(data: InsertProposal): Promise<Proposal>;
  getProposal(clientId: string): Promise<Proposal | undefined>;
  updateProposal(id: string, data: Partial<InsertProposal>): Promise<Proposal | undefined>;
  deleteProposal(id: string): Promise<void>;

  createPayment(data: InsertPayment): Promise<Payment>;
  getPayment(clientId: string): Promise<Payment | undefined>;
  updatePayment(clientId: string, data: Partial<InsertPayment>): Promise<Payment | undefined>;
  deletePayment(id: string): Promise<void>;

  createProject(data: InsertProject): Promise<Project>;
  getProject(clientId: string): Promise<Project | undefined>;
  updateProject(clientId: string, data: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: string): Promise<void>;

  // Website form methods
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

  // Delete methods
  deleteServiceInquiry(id: string): Promise<void>;
  deleteNewsletterSubscription(id: string): Promise<void>;
  deleteContactSubmission(id: string): Promise<void>;
  deleteQuoteRequest(id: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // CRM Client methods
  async createClient(data: InsertClient): Promise<Client> {
    const [record] = await db
      .insert(clients)
      .values(data)
      .returning();
    return record;
  }

  async getClient(id: string): Promise<Client | undefined> {
    const [record] = await db.select().from(clients).where(eq(clients.id, id));
    return record;
  }

  async getAllClients(): Promise<Client[]> {
    return await db.select().from(clients);
  }

  async updateClient(id: string, data: Partial<InsertClient>): Promise<Client | undefined> {
    const [record] = await db
      .update(clients)
      .set(data)
      .where(eq(clients.id, id))
      .returning();
    return record;
  }

  async deleteClient(id: string): Promise<void> {
    await db.delete(clients).where(eq(clients.id, id));
  }

  // CRM FollowUp methods
  async createFollowUp(data: InsertFollowUp): Promise<FollowUp> {
    const [record] = await db
      .insert(followUps)
      .values(data)
      .returning();
    return record;
  }

  async getFollowUpsByClient(clientId: string): Promise<FollowUp[]> {
    return await db.select().from(followUps).where(eq(followUps.clientId, clientId));
  }

  async updateFollowUp(id: string, data: Partial<InsertFollowUp>): Promise<FollowUp | undefined> {
    const [record] = await db
      .update(followUps)
      .set(data)
      .where(eq(followUps.id, id))
      .returning();
    return record;
  }

  async deleteFollowUp(id: string): Promise<void> {
    await db.delete(followUps).where(eq(followUps.id, id));
  }

  // CRM Requirement methods
  async createRequirement(data: InsertRequirement): Promise<Requirement> {
    const [record] = await db
      .insert(requirements)
      .values(data)
      .returning();
    return record;
  }

  async getRequirement(clientId: string): Promise<Requirement | undefined> {
    const [record] = await db.select().from(requirements).where(eq(requirements.clientId, clientId));
    return record;
  }

  async updateRequirement(clientId: string, data: Partial<InsertRequirement>): Promise<Requirement | undefined> {
    const [record] = await db
      .update(requirements)
      .set(data)
      .where(eq(requirements.clientId, clientId))
      .returning();
    return record;
  }

  async deleteRequirement(id: string): Promise<void> {
    await db.delete(requirements).where(eq(requirements.id, id));
  }

  // CRM Proposal methods
  async createProposal(data: InsertProposal): Promise<Proposal> {
    const [record] = await db
      .insert(proposals)
      .values(data)
      .returning();
    return record;
  }

  async getProposal(clientId: string): Promise<Proposal | undefined> {
    const [record] = await db.select().from(proposals).where(eq(proposals.clientId, clientId));
    return record;
  }

  async updateProposal(id: string, data: Partial<InsertProposal>): Promise<Proposal | undefined> {
    const [record] = await db
      .update(proposals)
      .set(data)
      .where(eq(proposals.clientId, id))
      .returning();
    return record;
  }

  async deleteProposal(id: string): Promise<void> {
    await db.delete(proposals).where(eq(proposals.id, id));
  }

  // CRM Payment methods
  async createPayment(data: InsertPayment): Promise<Payment> {
    const [record] = await db
      .insert(payments)
      .values(data)
      .returning();
    return record;
  }

  async getPayment(clientId: string): Promise<Payment | undefined> {
    const [record] = await db.select().from(payments).where(eq(payments.clientId, clientId));
    return record;
  }

  async updatePayment(clientId: string, data: Partial<InsertPayment>): Promise<Payment | undefined> {
    const [record] = await db
      .update(payments)
      .set(data)
      .where(eq(payments.clientId, clientId))
      .returning();
    return record;
  }

  async deletePayment(id: string): Promise<void> {
    await db.delete(payments).where(eq(payments.id, id));
  }

  // CRM Project methods
  async createProject(data: InsertProject): Promise<Project> {
    const [record] = await db
      .insert(projects)
      .values(data)
      .returning();
    return record;
  }

  async getProject(clientId: string): Promise<Project | undefined> {
    const [record] = await db.select().from(projects).where(eq(projects.clientId, clientId));
    return record;
  }

  async updateProject(clientId: string, data: Partial<InsertProject>): Promise<Project | undefined> {
    const [record] = await db
      .update(projects)
      .set(data)
      .where(eq(projects.clientId, clientId))
      .returning();
    return record;
  }

  async deleteProject(id: string): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  // Website form methods
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
