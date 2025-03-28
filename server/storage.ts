import {
  users, type User, type InsertUser,
  approachItems, type ApproachItem, type InsertApproachItem,
  events, type Event, type InsertEvent,
  missions, type Mission, type InsertMission,
  activities, type Activity, type InsertActivity,
  partners, type Partner, type InsertPartner,
  areas, type Area, type InsertArea,
  contactInfo, type ContactInfo, type InsertContactInfo,
  contactSubmissions, type ContactSubmission, type InsertContactSubmission,
  newsletterSubscriptions, type NewsletterSubscription, type InsertNewsletterSubscription,
  aboutContent, type AboutContent, type InsertAboutContent
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Approach Items
  getApproachItems(): Promise<ApproachItem[]>;
  getApproachItem(id: number): Promise<ApproachItem | undefined>;
  createApproachItem(item: InsertApproachItem): Promise<ApproachItem>;
  updateApproachItem(id: number, item: Partial<InsertApproachItem>): Promise<ApproachItem | undefined>;
  deleteApproachItem(id: number): Promise<boolean>;
  
  // Events
  getEvents(): Promise<Event[]>;
  getEvent(id: number): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<boolean>;
  
  // Missions
  getMissions(): Promise<Mission[]>;
  getMission(id: number): Promise<Mission | undefined>;
  createMission(mission: InsertMission): Promise<Mission>;
  updateMission(id: number, mission: Partial<InsertMission>): Promise<Mission | undefined>;
  deleteMission(id: number): Promise<boolean>;
  
  // Activities
  getActivities(): Promise<Activity[]>;
  getActivity(id: number): Promise<Activity | undefined>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  updateActivity(id: number, activity: Partial<InsertActivity>): Promise<Activity | undefined>;
  deleteActivity(id: number): Promise<boolean>;
  
  // Partners
  getPartners(): Promise<Partner[]>;
  getPartner(id: number): Promise<Partner | undefined>;
  createPartner(partner: InsertPartner): Promise<Partner>;
  updatePartner(id: number, partner: Partial<InsertPartner>): Promise<Partner | undefined>;
  deletePartner(id: number): Promise<boolean>;
  
  // Areas
  getAreas(): Promise<Area[]>;
  getArea(id: number): Promise<Area | undefined>;
  createArea(area: InsertArea): Promise<Area>;
  updateArea(id: number, area: Partial<InsertArea>): Promise<Area | undefined>;
  deleteArea(id: number): Promise<boolean>;
  
  // Contact Info
  getContactInfo(): Promise<ContactInfo | undefined>;
  updateContactInfo(info: InsertContactInfo): Promise<ContactInfo>;
  
  // Contact Submissions
  getContactSubmissions(): Promise<ContactSubmission[]>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  deleteContactSubmission(id: number): Promise<boolean>;
  
  // Newsletter Subscriptions
  getNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  deleteNewsletterSubscription(id: number): Promise<boolean>;
  
  // About Content
  getAboutContent(): Promise<AboutContent | undefined>;
  updateAboutContent(content: InsertAboutContent): Promise<AboutContent>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private approachItems: Map<number, ApproachItem>;
  private events: Map<number, Event>;
  private missions: Map<number, Mission>;
  private activities: Map<number, Activity>;
  private partners: Map<number, Partner>;
  private areas: Map<number, Area>;
  private contactInfoData: ContactInfo | undefined;
  private contactSubmissions: Map<number, ContactSubmission>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  private aboutContentData: AboutContent | undefined;
  
  currentId: number;
  
  constructor() {
    this.users = new Map();
    this.approachItems = new Map();
    this.events = new Map();
    this.missions = new Map();
    this.activities = new Map();
    this.partners = new Map();
    this.areas = new Map();
    this.contactSubmissions = new Map();
    this.newsletterSubscriptions = new Map();
    this.currentId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }
  
  // Initialize with sample data for development
  private initializeData() {
    // Create admin user
    this.createUser({
      username: "admin",
      password: "password123", // In a real app, this would be hashed
      isAdmin: true
    });
    
    // Create sample approach items
    this.createApproachItem({
      icon: "🛡️",
      title: "Prévention",
      description: "Nous souhaitons agir à la source en sensibilisant sur l'impact des déchets dans nos rivières. Notre objectif est d'encourager des changements de comportements pour limiter la pollution de nos cours d'eau.",
      order: 1
    });
    
    this.createApproachItem({
      icon: "📢",
      title: "Animation",
      description: "Nous participons à divers événements comme les Rendez-vous de l'Erdre pour créer du lien avec le public. Notre approche se veut accessible et conviviale, pour permettre à chacun de contribuer à sa façon.",
      order: 2
    });
    
    this.createApproachItem({
      icon: "⬇️",
      title: "Réduction",
      description: "Notre priorité est de réduire la quantité de déchets qui atteignent nos rivières. Nous identifions les zones d'accumulation et développons des solutions pratiques comme les bacs à déchets.",
      order: 3
    });
    
    this.createApproachItem({
      icon: "🧤",
      title: "Collecte",
      description: "L'action de collecte est au cœur de notre engagement. Nous organisons régulièrement des sorties de nettoyage sur l'Erdre et sur la Loire, en mobilisant des bénévoles et en utilisant des méthodes adaptées aux milieux aquatiques.",
      order: 4
    });
    
    this.createApproachItem({
      icon: "🤝",
      title: "Collaboration",
      description: "Nous travaillons main dans la main avec les autres acteurs du territoire : associations locales, collectivités, usagers des cours d'eau. C'est ensemble que nous pourrons avoir un impact significatif sur la qualité de nos rivières.",
      order: 5
    });
    
    this.createApproachItem({
      icon: "📝",
      title: "Documentation",
      description: "Nous observons et documentons l'état de nos rivières pour mieux comprendre les problématiques. Ces observations nous permettent d'adapter nos actions et de partager notre expérience avec d'autres acteurs engagés.",
      order: 6
    });
    
    // Create sample events
    this.createEvent({
      status: "Prochainement",
      title: "Première Éco-Navigation avec La Toue",
      description: "Venez découvrir notre nouvelle formule de nettoyage de l'Erdre à bord de La Toue. Une expérience unique alliant action écologique et découverte du patrimoine fluvial.",
      actionText: "Se tenir informé",
      actionLink: "#contact",
      order: 1
    });
    
    this.createEvent({
      status: "À venir",
      title: "Rendez-vous de l'Erdre",
      description: "Retrouvez-nous lors des Rendez-vous de l'Erdre pour échanger sur nos actions et découvrir comment participer à la préservation de nos rivières.",
      actionText: "Plus d'informations",
      actionLink: "#contact",
      order: 2
    });
    
    this.createEvent({
      status: "En continu",
      title: "Collectes sur l'Erdre",
      description: "Nos actions de collecte se poursuivent régulièrement sur l'Erdre. Contactez-nous pour connaître les prochaines dates et rejoindre notre équipe de bénévoles.",
      actionText: "Nous contacter",
      actionLink: "#contact",
      order: 3
    });
    
    // Create sample missions
    this.createMission({
      icon: "🌊",
      title: "Actions concrètes",
      description: "Notre priorité est d'agir sur le terrain pour réduire la pollution par les déchets dans nos cours d'eau. Nous menons des actions régulières de nettoyage sur l'Erdre et la Loire, en développant des solutions pratiques comme les bacs à déchets pour impliquer tous les usagers des rivières.",
      order: 1
    });
    
    this.createMission({
      icon: "🌱",
      title: "Sensibilisation",
      description: "En participant à des événements locaux comme les Rendez-vous de l'Erdre, nous souhaitons sensibiliser le public aux enjeux de la pollution des rivières. Nous privilégions une approche positive et constructive, montrant qu'il est possible d'agir à son échelle.",
      order: 2
    });
    
    this.createMission({
      icon: "🤝",
      title: "Collaboration",
      description: "Nous souhaitons contribuer à la dynamique locale en collaborant avec les autres acteurs du territoire - associations, collectivités, usagers des cours d'eau. Notre approche se veut complémentaire des actions existantes, en apportant des solutions innovantes comme les BADS.",
      order: 3
    });
    
    // Create sample activities
    this.createActivity({
      image: "/bac.jpg",
      title: "Projet BADS - Bacs à Déchets Sauvages",
      description: "Nous déployons un réseau de <span class=\"highlight-blue\">Bacs à Déchets Sauvages (BADS)</span> sur les rivières de Nantes Métropole, en commençant par l'Erdre. Ces bacs, installés à des points stratégiques, permettent aux plaisanciers, sportifs nautiques et riverains de participer activement à la collecte des déchets flottants. <span class=\"highlight-blue\">Rejoignez le mouvement BADS et devenez acteur de la propreté de nos rivières !</span>",
      actionText: "Participer au projet BADS",
      actionLink: "#contact",
      order: 1,
      imagePosition: "left"
    });
    
    this.createActivity({
      image: "/bateau.png",
      title: "Éco-Navigations : Nettoyons en Explorant",
      description: "Vivez une expérience unique avec nos <span class=\"highlight-blue\">Éco-Navigations</span> ! Ces sorties en bateau, canoë ou paddle combinent découverte du patrimoine naturel et culturel de nos rivières et actions de nettoyage. <span class=\"highlight-blue\">Explorez l'Erdre, la Loire et leurs affluents tout en contribuant concrètement à leur dépollution.</span> Une manière conviviale et originale de s'engager pour l'environnement.",
      actionText: "S'inscrire à une Éco-Navigation",
      actionLink: "#contact",
      order: 2,
      imagePosition: "right"
    });
    
    this.createActivity({
      image: "/sensibilisation.jpg",
      title: "Sensibilisation : Partager et Échanger",
      description: "Notre association participe à de nombreux <span class=\"highlight-blue\">événements locaux</span> pour sensibiliser le public aux enjeux de la pollution des rivières. Stands d'information, ateliers pratiques, conférences... <span class=\"highlight-blue\">Nous mettons en place différentes actions pour toucher un large public</span> et créer une prise de conscience collective. Nous intervenons également dans les écoles pour éduquer les plus jeunes à la préservation de nos ressources en eau.",
      actionText: "Organiser une intervention",
      actionLink: "#contact",
      order: 3,
      imagePosition: "left"
    });
    
    // Create contact info
    this.updateContactInfo({
      email: "contact@clean-nantes.org",
      phone: "+33 (0)6 XX XX XX XX",
      address: "Nantes, France"
    });
    
    // Create about content
    this.updateAboutContent({
      title: "Qui sommes-nous ?",
      content: "<p>C.L.E.A.N. - Conservation de l'Eau À Nantes est une association créée le 4 avril 2022 avec une mission ambitieuse : participer activement à la réduction des déchets dans nos rivières nantaises. Nous souhaitons apporter notre pierre à l'édifice en agissant concrètement là où nous pouvons avoir un impact direct.</p><p>Actuellement, nos actions se concentrent principalement sur l'Erdre, avec quelques interventions sur la Loire. À terme, nous aimerions étendre notre présence sur l'ensemble du réseau hydrographique nantais. Notre équipe de bénévoles passionnés développe des solutions pratiques comme les bacs à déchets et organise régulièrement des collectes.</p><p>Notre approche se veut collaborative et innovante : nous travaillons avec les usagers des cours d'eau, les associations locales et les collectivités pour imaginer et mettre en place des solutions durables. Nous sommes convaincus que c'est en unissant nos forces que nous pourrons avoir un réel impact sur la qualité de nos rivières.</p><p>Notre ambition ? Devenir un acteur efficace et durable de la protection des rivières nantaises, tout en menant des actions concrètes. Rejoignez l'aventure C.L.E.A.N. et participez à l'histoire que nous écrivons !</p>",
      image: "/rive.jpeg"
    });
  }
  
  // Users
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    // S'assurer que isAdmin est toujours défini (null si non spécifié)
    const user: User = { 
      ...insertUser, 
      id,
      isAdmin: insertUser.isAdmin ?? null 
    };
    this.users.set(id, user);
    return user;
  }
  
  // Approach Items
  async getApproachItems(): Promise<ApproachItem[]> {
    return Array.from(this.approachItems.values())
      .sort((a, b) => a.order - b.order);
  }
  
  async getApproachItem(id: number): Promise<ApproachItem | undefined> {
    return this.approachItems.get(id);
  }
  
  async createApproachItem(item: InsertApproachItem): Promise<ApproachItem> {
    const id = this.currentId++;
    const approachItem: ApproachItem = { ...item, id };
    this.approachItems.set(id, approachItem);
    return approachItem;
  }
  
  async updateApproachItem(id: number, item: Partial<InsertApproachItem>): Promise<ApproachItem | undefined> {
    const existingItem = this.approachItems.get(id);
    if (!existingItem) return undefined;
    
    const updatedItem = { ...existingItem, ...item };
    this.approachItems.set(id, updatedItem);
    return updatedItem;
  }
  
  async deleteApproachItem(id: number): Promise<boolean> {
    return this.approachItems.delete(id);
  }
  
  // Events
  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values())
      .sort((a, b) => a.order - b.order);
  }
  
  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }
  
  async createEvent(event: InsertEvent): Promise<Event> {
    const id = this.currentId++;
    const newEvent: Event = { ...event, id };
    this.events.set(id, newEvent);
    return newEvent;
  }
  
  async updateEvent(id: number, event: Partial<InsertEvent>): Promise<Event | undefined> {
    const existingEvent = this.events.get(id);
    if (!existingEvent) return undefined;
    
    const updatedEvent = { ...existingEvent, ...event };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }
  
  async deleteEvent(id: number): Promise<boolean> {
    return this.events.delete(id);
  }
  
  // Missions
  async getMissions(): Promise<Mission[]> {
    return Array.from(this.missions.values())
      .sort((a, b) => a.order - b.order);
  }
  
  async getMission(id: number): Promise<Mission | undefined> {
    return this.missions.get(id);
  }
  
  async createMission(mission: InsertMission): Promise<Mission> {
    const id = this.currentId++;
    const newMission: Mission = { ...mission, id };
    this.missions.set(id, newMission);
    return newMission;
  }
  
  async updateMission(id: number, mission: Partial<InsertMission>): Promise<Mission | undefined> {
    const existingMission = this.missions.get(id);
    if (!existingMission) return undefined;
    
    const updatedMission = { ...existingMission, ...mission };
    this.missions.set(id, updatedMission);
    return updatedMission;
  }
  
  async deleteMission(id: number): Promise<boolean> {
    return this.missions.delete(id);
  }
  
  // Activities
  async getActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .sort((a, b) => a.order - b.order);
  }
  
  async getActivity(id: number): Promise<Activity | undefined> {
    return this.activities.get(id);
  }
  
  async createActivity(activity: InsertActivity): Promise<Activity> {
    const id = this.currentId++;
    const newActivity: Activity = { 
      ...activity, 
      id,
      imagePosition: activity.imagePosition ?? null 
    };
    this.activities.set(id, newActivity);
    return newActivity;
  }
  
  async updateActivity(id: number, activity: Partial<InsertActivity>): Promise<Activity | undefined> {
    const existingActivity = this.activities.get(id);
    if (!existingActivity) return undefined;
    
    const updatedActivity = { ...existingActivity, ...activity };
    this.activities.set(id, updatedActivity);
    return updatedActivity;
  }
  
  async deleteActivity(id: number): Promise<boolean> {
    return this.activities.delete(id);
  }
  
  // Partners
  async getPartners(): Promise<Partner[]> {
    return Array.from(this.partners.values())
      .sort((a, b) => a.order - b.order);
  }
  
  async getPartner(id: number): Promise<Partner | undefined> {
    return this.partners.get(id);
  }
  
  async createPartner(partner: InsertPartner): Promise<Partner> {
    const id = this.currentId++;
    const newPartner: Partner = { ...partner, id };
    this.partners.set(id, newPartner);
    return newPartner;
  }
  
  async updatePartner(id: number, partner: Partial<InsertPartner>): Promise<Partner | undefined> {
    const existingPartner = this.partners.get(id);
    if (!existingPartner) return undefined;
    
    const updatedPartner = { ...existingPartner, ...partner };
    this.partners.set(id, updatedPartner);
    return updatedPartner;
  }
  
  async deletePartner(id: number): Promise<boolean> {
    return this.partners.delete(id);
  }
  
  // Contact Info
  async getContactInfo(): Promise<ContactInfo | undefined> {
    return this.contactInfoData;
  }
  
  async updateContactInfo(info: InsertContactInfo): Promise<ContactInfo> {
    const id = 1; // Single record
    const contactInfo: ContactInfo = { ...info, id };
    this.contactInfoData = contactInfo;
    return contactInfo;
  }
  
  // Contact Submissions
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values())
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }
  
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentId++;
    const newSubmission: ContactSubmission = { 
      ...submission, 
      id, 
      createdAt: new Date() 
    };
    this.contactSubmissions.set(id, newSubmission);
    return newSubmission;
  }
  
  async deleteContactSubmission(id: number): Promise<boolean> {
    return this.contactSubmissions.delete(id);
  }
  
  // Newsletter Subscriptions
  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return Array.from(this.newsletterSubscriptions.values())
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0));
  }
  
  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    // Check if email already exists
    const existingSubscription = Array.from(this.newsletterSubscriptions.values())
      .find(sub => sub.email === subscription.email);
    
    if (existingSubscription) {
      return existingSubscription;
    }
    
    const id = this.currentId++;
    const newSubscription: NewsletterSubscription = { 
      ...subscription, 
      id, 
      createdAt: new Date() 
    };
    this.newsletterSubscriptions.set(id, newSubscription);
    return newSubscription;
  }
  
  async deleteNewsletterSubscription(id: number): Promise<boolean> {
    return this.newsletterSubscriptions.delete(id);
  }
  
  // About Content
  async getAboutContent(): Promise<AboutContent | undefined> {
    return this.aboutContentData;
  }
  
  async updateAboutContent(content: InsertAboutContent): Promise<AboutContent> {
    const id = 1; // Single record
    const aboutContent: AboutContent = { ...content, id };
    this.aboutContentData = aboutContent;
    return aboutContent;
  }
  
  // Areas
  async getAreas(): Promise<Area[]> {
    return Array.from(this.areas.values())
      .sort((a, b) => a.order - b.order);
  }
  
  async getArea(id: number): Promise<Area | undefined> {
    return this.areas.get(id);
  }
  
  async createArea(area: InsertArea): Promise<Area> {
    const id = this.currentId++;
    const newArea: Area = { 
      ...area, 
      id,
      description: area.description ?? null 
    };
    this.areas.set(id, newArea);
    return newArea;
  }
  
  async updateArea(id: number, area: Partial<InsertArea>): Promise<Area | undefined> {
    const existingArea = this.areas.get(id);
    if (!existingArea) return undefined;
    
    const updatedArea = { ...existingArea, ...area };
    this.areas.set(id, updatedArea);
    return updatedArea;
  }
  
  async deleteArea(id: number): Promise<boolean> {
    return this.areas.delete(id);
  }
}

// Import the DBStorage class
import { DBStorage } from './db-storage';

// Use DBStorage instead of MemStorage
export const storage = new DBStorage();
