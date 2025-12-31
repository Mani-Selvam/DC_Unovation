import { sql } from "drizzle-orm";
import {
    pgTable,
    text,
    timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const serviceInquiries = pgTable("service_inquiries", {
    id: text("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: text("name").notNull(),
    email: text("email").notNull(),
    service: text("service").notNull(),
    message: text("message").notNull(),
    page: text("page").notNull(),
    status: text("status").notNull().default("new"),
    notes: text("notes"),
    timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
    id: text("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    email: text("email").notNull(),
    name: text("name"),
    source: text("source").notNull(),
    timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const contactSubmissions = pgTable("contact_submissions", {
    id: text("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    message: text("message").notNull(),
    page: text("page").notNull(),
    timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const quoteRequests = pgTable("quote_requests", {
    id: text("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: text("name").notNull(),
    email: text("email").notNull(),
    projectType: text("project_type").notNull(),
    budget: text("budget").notNull(),
    message: text("message").notNull(),
    page: text("page").notNull(),
    status: text("status").notNull().default("new"),
    notes: text("notes"),
    timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const admins = pgTable("admins", {
    id: text("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
});

export const insertServiceInquirySchema = createInsertSchema(
    serviceInquiries
).omit({
    id: true,
    timestamp: true,
    status: true,
    notes: true,
});

export const insertNewsletterSubscriptionSchema = createInsertSchema(
    newsletterSubscriptions
).omit({
    id: true,
    timestamp: true,
});

export const insertContactSubmissionSchema = createInsertSchema(
    contactSubmissions
).omit({
    id: true,
    timestamp: true,
});

export const insertQuoteRequestSchema = createInsertSchema(
    quoteRequests
).omit({
    id: true,
    timestamp: true,
    status: true,
    notes: true,
});

export const insertAdminSchema = createInsertSchema(admins).omit({
    id: true,
});

export type InsertServiceInquiry = z.infer<typeof insertServiceInquirySchema>;
export type ServiceInquiry = typeof serviceInquiries.$inferSelect;

export type InsertNewsletterSubscription = z.infer<
    typeof insertNewsletterSubscriptionSchema
>;
export type NewsletterSubscription =
    typeof newsletterSubscriptions.$inferSelect;

export type InsertContactSubmission = z.infer<
    typeof insertContactSubmissionSchema
>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export type InsertQuoteRequest = z.infer<typeof insertQuoteRequestSchema>;
export type QuoteRequest = typeof quoteRequests.$inferSelect;

export type Admin = typeof admins.$inferSelect;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
