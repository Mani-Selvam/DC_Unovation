import { sql } from "drizzle-orm";
import {
    pgTable,
    text,
    timestamp,
    integer,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// CRM Tables
export const clients = pgTable("clients", {
    id: text("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    email: text("email"),
    company: text("company"),
    serviceNeeded: text("service_needed").notNull(),
    source: text("source").notNull(), // WhatsApp / Call / Website
    dateAdded: timestamp("date_added").notNull().defaultNow(),
});

export const followUps = pgTable("follow_ups", {
    id: text("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    clientId: text("client_id").notNull().references(() => clients.id),
    followUpDate: timestamp("follow_up_date").notNull(),
    followUpType: text("follow_up_type").notNull(), // Call / WhatsApp / Email / Meeting
    discussionNotes: text("discussion_notes").notNull(),
    nextFollowUpDate: timestamp("next_follow_up_date"),
    status: text("status").notNull(), // Interested / Pending / Confirmed
    dateCreated: timestamp("date_created").notNull().defaultNow(),
});

export const requirements = pgTable("requirements", {
    id: text("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    clientId: text("client_id").notNull().references(() => clients.id),
    websiteType: text("website_type"),
    pagesNeeded: text("pages_needed"),
    features: text("features"),
    referenceWebsites: text("reference_websites"),
    budgetRange: text("budget_range"),
    deadline: timestamp("deadline"),
    dateCreated: timestamp("date_created").notNull().defaultNow(),
});

export const proposals = pgTable("proposals", {
    id: text("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    clientId: text("client_id").notNull().references(() => clients.id),
    proposedService: text("proposed_service").notNull(),
    price: integer("price").notNull(),
    timeline: text("timeline").notNull(),
    notes: text("notes"),
    proposalStatus: text("proposal_status").notNull(), // Sent / Accepted / Rejected
    dateCreated: timestamp("date_created").notNull().defaultNow(),
});

export const payments = pgTable("payments", {
    id: text("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    clientId: text("client_id").notNull().references(() => clients.id),
    totalAmount: integer("total_amount").notNull(),
    advancePaid: integer("advance_paid").notNull().default(0),
    balanceAmount: integer("balance_amount").notNull(),
    paymentMode: text("payment_mode"), // Bank Transfer / Cash / UPI / Cheque
    paymentStatus: text("payment_status").notNull(), // Pending / Partial / Completed
    dateCreated: timestamp("date_created").notNull().defaultNow(),
});

export const projects = pgTable("projects", {
    id: text("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    clientId: text("client_id").notNull().references(() => clients.id),
    projectStage: text("project_stage").notNull(), // Design / Development / Review / Completed
    lastUpdate: text("last_update"),
    nextAction: text("next_action"),
    expectedDeliveryDate: timestamp("expected_delivery_date"),
    dateCreated: timestamp("date_created").notNull().defaultNow(),
});

// Existing tables (for website)
export const serviceInquiries = pgTable("service_inquiries", {
    id: text("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    name: text("name").notNull(),
    email: text("email").notNull(),
    service: text("service").notNull(),
    message: text("message").notNull(),
    page: text("page").notNull(),
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
    timestamp: timestamp("timestamp").notNull().defaultNow(),
});

export const admins = pgTable("admins", {
    id: text("id")
        .primaryKey()
        .default(sql`gen_random_uuid()`),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
});

// CRM Insert Schemas
export const insertClientSchema = createInsertSchema(clients).omit({
    id: true,
    dateAdded: true,
});

export const insertFollowUpSchema = createInsertSchema(followUps).omit({
    id: true,
    dateCreated: true,
});

export const insertRequirementSchema = createInsertSchema(requirements).omit({
    id: true,
    dateCreated: true,
});

export const insertProposalSchema = createInsertSchema(proposals).omit({
    id: true,
    dateCreated: true,
});

export const insertPaymentSchema = createInsertSchema(payments).omit({
    id: true,
    dateCreated: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
    id: true,
    dateCreated: true,
});

// Existing insert schemas
export const insertServiceInquirySchema = createInsertSchema(
    serviceInquiries
).omit({
    id: true,
    timestamp: true,
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
});

export const insertAdminSchema = createInsertSchema(admins).omit({
    id: true,
});

// CRM Types
export type InsertClient = z.infer<typeof insertClientSchema>;
export type Client = typeof clients.$inferSelect;

export type InsertFollowUp = z.infer<typeof insertFollowUpSchema>;
export type FollowUp = typeof followUps.$inferSelect;

export type InsertRequirement = z.infer<typeof insertRequirementSchema>;
export type Requirement = typeof requirements.$inferSelect;

export type InsertProposal = z.infer<typeof insertProposalSchema>;
export type Proposal = typeof proposals.$inferSelect;

export type InsertPayment = z.infer<typeof insertPaymentSchema>;
export type Payment = typeof payments.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

// Existing types
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
