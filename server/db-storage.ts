import { eq } from 'drizzle-orm';
import { db } from '../shared/db';
import { 
  users, approachItems, events, missions, activities, partners, areas,
  contactInfo, contactSubmissions, newsletterSubscriptions, aboutContent,
  User, ApproachItem, Event, Mission, Activity, Partner, Area,
  ContactInfo, ContactSubmission, NewsletterSubscription, AboutContent,
  InsertUser, InsertApproachItem, InsertEvent, InsertMission, InsertActivity, InsertPartner, InsertArea,
  InsertContactInfo, InsertContactSubmission, InsertNewsletterSubscription, InsertAboutContent
} from '../shared/schema';
import { IStorage } from './storage';

export class DBStorage implements IStorage {
  
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  // Approach Items
  async getApproachItems(): Promise<ApproachItem[]> {
    return db.select().from(approachItems).orderBy(approachItems.order);
  }

  async getApproachItem(id: number): Promise<ApproachItem | undefined> {
    const result = await db.select().from(approachItems).where(eq(approachItems.id, id));
    return result[0];
  }

  async createApproachItem(item: InsertApproachItem): Promise<ApproachItem> {
    const result = await db.insert(approachItems).values(item).returning();
    return result[0];
  }

  async updateApproachItem(id: number, item: Partial<InsertApproachItem>): Promise<ApproachItem | undefined> {
    const result = await db.update(approachItems)
      .set(item)
      .where(eq(approachItems.id, id))
      .returning();
    return result[0];
  }

  async deleteApproachItem(id: number): Promise<boolean> {
    const result = await db.delete(approachItems).where(eq(approachItems.id, id)).returning();
    return result.length > 0;
  }

  // Events
  async getEvents(): Promise<Event[]> {
    return db.select().from(events).orderBy(events.order);
  }

  async getEvent(id: number): Promise<Event | undefined> {
    const result = await db.select().from(events).where(eq(events.id, id));
    return result[0];
  }

  async createEvent(event: InsertEvent): Promise<Event> {
    const result = await db.insert(events).values(event).returning();
    return result[0];
  }

  async updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined> {
    const result = await db.update(events)
      .set(event)
      .where(eq(events.id, id))
      .returning();
    return result[0];
  }

  async deleteEvent(id: number): Promise<boolean> {
    const result = await db.delete(events).where(eq(events.id, id)).returning();
    return result.length > 0;
  }

  // Missions
  async getMissions(): Promise<Mission[]> {
    return db.select().from(missions).orderBy(missions.order);
  }

  async getMission(id: number): Promise<Mission | undefined> {
    const result = await db.select().from(missions).where(eq(missions.id, id));
    return result[0];
  }

  async createMission(mission: InsertMission): Promise<Mission> {
    const result = await db.insert(missions).values(mission).returning();
    return result[0];
  }

  async updateMission(id: number, mission: Partial<InsertMission>): Promise<Mission | undefined> {
    const result = await db.update(missions)
      .set(mission)
      .where(eq(missions.id, id))
      .returning();
    return result[0];
  }

  async deleteMission(id: number): Promise<boolean> {
    const result = await db.delete(missions).where(eq(missions.id, id)).returning();
    return result.length > 0;
  }

  // Activities
  async getActivities(): Promise<Activity[]> {
    return db.select().from(activities).orderBy(activities.order);
  }

  async getActivity(id: number): Promise<Activity | undefined> {
    const result = await db.select().from(activities).where(eq(activities.id, id));
    return result[0];
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const result = await db.insert(activities).values(activity).returning();
    return result[0];
  }

  async updateActivity(id: number, activity: Partial<InsertActivity>): Promise<Activity | undefined> {
    const result = await db.update(activities)
      .set(activity)
      .where(eq(activities.id, id))
      .returning();
    return result[0];
  }

  async deleteActivity(id: number): Promise<boolean> {
    const result = await db.delete(activities).where(eq(activities.id, id)).returning();
    return result.length > 0;
  }

  // Partners
  async getPartners(): Promise<Partner[]> {
    return db.select().from(partners).orderBy(partners.order);
  }

  async getPartner(id: number): Promise<Partner | undefined> {
    const result = await db.select().from(partners).where(eq(partners.id, id));
    return result[0];
  }

  async createPartner(partner: InsertPartner): Promise<Partner> {
    const result = await db.insert(partners).values(partner).returning();
    return result[0];
  }

  async updatePartner(id: number, partner: Partial<InsertPartner>): Promise<Partner | undefined> {
    const result = await db.update(partners)
      .set(partner)
      .where(eq(partners.id, id))
      .returning();
    return result[0];
  }

  async deletePartner(id: number): Promise<boolean> {
    const result = await db.delete(partners).where(eq(partners.id, id)).returning();
    return result.length > 0;
  }

  // Contact Info
  async getContactInfo(): Promise<ContactInfo | undefined> {
    const result = await db.select().from(contactInfo);
    return result[0];
  }

  async updateContactInfo(info: InsertContactInfo): Promise<ContactInfo> {
    // Check if contact info already exists
    const existing = await this.getContactInfo();
    
    if (existing) {
      // Update existing record
      const result = await db.update(contactInfo)
        .set(info)
        .where(eq(contactInfo.id, existing.id))
        .returning();
      return result[0];
    } else {
      // Create new record
      const result = await db.insert(contactInfo).values(info).returning();
      return result[0];
    }
  }

  // Contact Submissions
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return db.select().from(contactSubmissions);
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const result = await db.insert(contactSubmissions).values(submission).returning();
    return result[0];
  }

  async deleteContactSubmission(id: number): Promise<boolean> {
    const result = await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id)).returning();
    return result.length > 0;
  }

  // Newsletter Subscriptions
  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return db.select().from(newsletterSubscriptions);
  }

  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const result = await db.insert(newsletterSubscriptions).values(subscription).returning();
    return result[0];
  }

  async deleteNewsletterSubscription(id: number): Promise<boolean> {
    const result = await db.delete(newsletterSubscriptions).where(eq(newsletterSubscriptions.id, id)).returning();
    return result.length > 0;
  }

  // About Content
  async getAboutContent(): Promise<AboutContent | undefined> {
    const result = await db.select().from(aboutContent);
    return result[0];
  }

  async updateAboutContent(content: InsertAboutContent): Promise<AboutContent> {
    // Check if about content already exists
    const existing = await this.getAboutContent();
    
    if (existing) {
      // Update existing record
      const result = await db.update(aboutContent)
        .set(content)
        .where(eq(aboutContent.id, existing.id))
        .returning();
      return result[0];
    } else {
      // Create new record
      const result = await db.insert(aboutContent).values(content).returning();
      return result[0];
    }
  }
  
  // Areas
  async getAreas(): Promise<Area[]> {
    return db.select().from(areas).orderBy(areas.order);
  }

  async getArea(id: number): Promise<Area | undefined> {
    const result = await db.select().from(areas).where(eq(areas.id, id));
    return result[0];
  }

  async createArea(area: InsertArea): Promise<Area> {
    const result = await db.insert(areas).values(area).returning();
    return result[0];
  }

  async updateArea(id: number, area: Partial<InsertArea>): Promise<Area | undefined> {
    const result = await db.update(areas)
      .set(area)
      .where(eq(areas.id, id))
      .returning();
    return result[0];
  }

  async deleteArea(id: number): Promise<boolean> {
    const result = await db.delete(areas).where(eq(areas.id, id)).returning();
    return result.length > 0;
  }
}