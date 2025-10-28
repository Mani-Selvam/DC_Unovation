import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const leadTracking = pgTable("lead_tracking", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  page: text("page").notNull(),
  action: text("action").notNull(),
  name: text("name"),
  email: text("email"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const serviceInquiries = pgTable("service_inquiries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  service: text("service").notNull(),
  message: text("message").notNull(),
  page: text("page").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const projectInterests = pgTable("project_interests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  project: text("project").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message"),
  page: text("page").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const feedbackSubmissions = pgTable("feedback_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  rating: integer("rating").notNull(),
  message: text("message").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  name: text("name"),
  source: text("source").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const jobApplications = pgTable("job_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  role: text("role").notNull(),
  message: text("message").notNull(),
  resumeFileName: text("resume_file_name"),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  page: text("page").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertLeadTrackingSchema = createInsertSchema(leadTracking).omit({
  id: true,
  timestamp: true,
});

export const insertServiceInquirySchema = createInsertSchema(serviceInquiries).omit({
  id: true,
  timestamp: true,
});

export const insertProjectInterestSchema = createInsertSchema(projectInterests).omit({
  id: true,
  timestamp: true,
});

export const insertFeedbackSubmissionSchema = createInsertSchema(feedbackSubmissions).omit({
  id: true,
  timestamp: true,
});

export const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).omit({
  id: true,
  timestamp: true,
});

export const insertJobApplicationSchema = createInsertSchema(jobApplications).omit({
  id: true,
  timestamp: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertLeadTracking = z.infer<typeof insertLeadTrackingSchema>;
export type LeadTracking = typeof leadTracking.$inferSelect;

export type InsertServiceInquiry = z.infer<typeof insertServiceInquirySchema>;
export type ServiceInquiry = typeof serviceInquiries.$inferSelect;

export type InsertProjectInterest = z.infer<typeof insertProjectInterestSchema>;
export type ProjectInterest = typeof projectInterests.$inferSelect;

export type InsertFeedbackSubmission = z.infer<typeof insertFeedbackSubmissionSchema>;
export type FeedbackSubmission = typeof feedbackSubmissions.$inferSelect;

export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;
export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;

export type InsertJobApplication = z.infer<typeof insertJobApplicationSchema>;
export type JobApplication = typeof jobApplications.$inferSelect;

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
