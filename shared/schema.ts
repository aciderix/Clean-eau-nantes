import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  isAdmin: boolean("is_admin").default(false),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  isAdmin: true,
});

// Approach items model
export const approachItems = pgTable("approach_items", {
  id: serial("id").primaryKey(),
  icon: text("icon").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(),
});

export const insertApproachItemSchema = createInsertSchema(approachItems).pick({
  icon: true,
  title: true,
  description: true,
  order: true,
});

// Events model
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  status: text("status").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  actionText: text("action_text").notNull(),
  actionLink: text("action_link").notNull(),
  order: integer("order").notNull(),
  image: text("image"),
});

export const insertEventSchema = createInsertSchema(events).pick({
  status: true,
  title: true,
  description: true,
  actionText: true,
  actionLink: true,
  order: true,
  image: true,
});

// Missions model
export const missions = pgTable("missions", {
  id: serial("id").primaryKey(),
  icon: text("icon").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull(),
});

export const insertMissionSchema = createInsertSchema(missions).pick({
  icon: true,
  title: true,
  description: true,
  order: true,
});

// Activities model
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  image: text("image").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  actionText: text("action_text").notNull(),
  actionLink: text("action_link").notNull(),
  order: integer("order").notNull(),
  imagePosition: text("image_position").default("left"),
});

export const insertActivitySchema = createInsertSchema(activities).pick({
  image: true,
  title: true,
  description: true,
  actionText: true,
  actionLink: true,
  order: true,
  imagePosition: true,
});

// Contact information model
export const contactInfo = pgTable("contact_info", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
});

export const insertContactInfoSchema = createInsertSchema(contactInfo).pick({
  email: true,
  phone: true,
  address: true,
});

// Contact form submissions
export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

// Newsletter subscriptions
export const newsletterSubscriptions = pgTable("newsletter_subscriptions", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).pick({
  email: true,
});

// About section content
export const aboutContent = pgTable("about_content", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
});

export const insertAboutContentSchema = createInsertSchema(aboutContent).pick({
  title: true,
  content: true,
  image: true,
});

// Partners model
export const partners = pgTable("partners", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo").notNull(),
  url: text("url").notNull(),
  order: integer("order").notNull(),
});

export const insertPartnerSchema = createInsertSchema(partners).pick({
  name: true,
  logo: true,
  url: true,
  order: true,
});

// Areas model
export const areas = pgTable("areas", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  description: text("description"),
  order: integer("order").notNull(),
});

export const insertAreaSchema = createInsertSchema(areas).pick({
  name: true,
  latitude: true,
  longitude: true,
  description: true,
  order: true,
});

// Export types
export type User = typeof users.$inferSelect;
export type ApproachItem = typeof approachItems.$inferSelect;
export type Event = typeof events.$inferSelect;
export type Mission = typeof missions.$inferSelect;
export type Activity = typeof activities.$inferSelect;
export type ContactInfo = typeof contactInfo.$inferSelect;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type AboutContent = typeof aboutContent.$inferSelect;

export type Partner = typeof partners.$inferSelect;
export type Area = typeof areas.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertApproachItem = z.infer<typeof insertApproachItemSchema>;
export type InsertEvent = z.infer<typeof insertEventSchema>;
export type InsertMission = z.infer<typeof insertMissionSchema>;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type InsertContactInfo = z.infer<typeof insertContactInfoSchema>;
export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;
export type InsertAboutContent = z.infer<typeof insertAboutContentSchema>;
export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type InsertArea = z.infer<typeof insertAreaSchema>;
