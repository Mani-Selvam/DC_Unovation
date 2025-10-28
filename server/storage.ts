// Using blueprint from javascript_database integration
import { eq } from "drizzle-orm";
import { db } from "./db";
import {
  users,
  leadTracking,
  serviceInquiries,
  projectInterests,
  feedbackSubmissions,
  newsletterSubscriptions,
  jobApplications,
  contactSubmissions,
  type User,
  type InsertUser,
  type LeadTracking,
  type InsertLeadTracking,
  type ServiceInquiry,
  type InsertServiceInquiry,
  type ProjectInterest,
  type InsertProjectInterest,
  type FeedbackSubmission,
  type InsertFeedbackSubmission,
  type NewsletterSubscription,
  type InsertNewsletterSubscription,
  type JobApplication,
  type InsertJobApplication,
  type ContactSubmission,
  type InsertContactSubmission,
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  createLeadTracking(data: InsertLeadTracking): Promise<LeadTracking>;
  createServiceInquiry(data: InsertServiceInquiry): Promise<ServiceInquiry>;
  createProjectInterest(data: InsertProjectInterest): Promise<ProjectInterest>;
  createFeedbackSubmission(data: InsertFeedbackSubmission): Promise<FeedbackSubmission>;
  createNewsletterSubscription(data: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  createJobApplication(data: InsertJobApplication): Promise<JobApplication>;
  createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createLeadTracking(data: InsertLeadTracking): Promise<LeadTracking> {
    const [record] = await db
      .insert(leadTracking)
      .values(data)
      .returning();
    return record;
  }

  async createServiceInquiry(data: InsertServiceInquiry): Promise<ServiceInquiry> {
    const [record] = await db
      .insert(serviceInquiries)
      .values(data)
      .returning();
    return record;
  }

  async createProjectInterest(data: InsertProjectInterest): Promise<ProjectInterest> {
    const [record] = await db
      .insert(projectInterests)
      .values(data)
      .returning();
    return record;
  }

  async createFeedbackSubmission(data: InsertFeedbackSubmission): Promise<FeedbackSubmission> {
    const [record] = await db
      .insert(feedbackSubmissions)
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

  async createJobApplication(data: InsertJobApplication): Promise<JobApplication> {
    const [record] = await db
      .insert(jobApplications)
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
}

export const storage = new DatabaseStorage();
