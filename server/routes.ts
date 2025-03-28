import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { uploadImage, ensurePublicDirExists } from "./upload-service";
import {
  insertApproachItemSchema,
  insertEventSchema,
  insertMissionSchema,
  insertActivitySchema,
  insertPartnerSchema,
  insertAreaSchema,
  insertContactInfoSchema,
  insertContactSubmissionSchema,
  insertNewsletterSubscriptionSchema,
  insertAboutContentSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Base API routes
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Auth routes
  app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      
      // In a real app, you'd use proper authentication with sessions or tokens
      res.json({ 
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });

  // Approach Items routes
  app.get('/api/approach-items', async (_req, res) => {
    try {
      const items = await storage.getApproachItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch approach items' });
    }
  });

  app.get('/api/approach-items/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const item = await storage.getApproachItem(id);
      
      if (!item) {
        return res.status(404).json({ message: 'Approach item not found' });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch approach item' });
    }
  });

  app.post('/api/approach-items', async (req, res) => {
    try {
      const itemData = insertApproachItemSchema.parse(req.body);
      const newItem = await storage.createApproachItem(itemData);
      res.status(201).json(newItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create approach item' });
    }
  });

  app.put('/api/approach-items/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const itemData = insertApproachItemSchema.partial().parse(req.body);
      const updatedItem = await storage.updateApproachItem(id, itemData);
      
      if (!updatedItem) {
        return res.status(404).json({ message: 'Approach item not found' });
      }
      
      res.json(updatedItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to update approach item' });
    }
  });

  app.delete('/api/approach-items/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteApproachItem(id);
      
      if (!success) {
        return res.status(404).json({ message: 'Approach item not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete approach item' });
    }
  });

  // Events routes
  app.get('/api/events', async (_req, res) => {
    try {
      const events = await storage.getEvents();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch events' });
    }
  });

  app.get('/api/events/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await storage.getEvent(id);
      
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch event' });
    }
  });

  app.post('/api/events', async (req, res) => {
    try {
      const eventData = insertEventSchema.parse(req.body);
      const newEvent = await storage.createEvent(eventData);
      res.status(201).json(newEvent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create event' });
    }
  });

  app.put('/api/events/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const eventData = insertEventSchema.partial().parse(req.body);
      const updatedEvent = await storage.updateEvent(id, eventData);
      
      if (!updatedEvent) {
        return res.status(404).json({ message: 'Event not found' });
      }
      
      res.json(updatedEvent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to update event' });
    }
  });

  app.delete('/api/events/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteEvent(id);
      
      if (!success) {
        return res.status(404).json({ message: 'Event not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete event' });
    }
  });

  // Missions routes
  app.get('/api/missions', async (_req, res) => {
    try {
      const missions = await storage.getMissions();
      res.json(missions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch missions' });
    }
  });

  app.get('/api/missions/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const mission = await storage.getMission(id);
      
      if (!mission) {
        return res.status(404).json({ message: 'Mission not found' });
      }
      
      res.json(mission);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch mission' });
    }
  });

  app.post('/api/missions', async (req, res) => {
    try {
      const missionData = insertMissionSchema.parse(req.body);
      const newMission = await storage.createMission(missionData);
      res.status(201).json(newMission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create mission' });
    }
  });

  app.put('/api/missions/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const missionData = insertMissionSchema.partial().parse(req.body);
      const updatedMission = await storage.updateMission(id, missionData);
      
      if (!updatedMission) {
        return res.status(404).json({ message: 'Mission not found' });
      }
      
      res.json(updatedMission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to update mission' });
    }
  });

  app.delete('/api/missions/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteMission(id);
      
      if (!success) {
        return res.status(404).json({ message: 'Mission not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete mission' });
    }
  });

  // Activities routes
  app.get('/api/activities', async (_req, res) => {
    try {
      const activities = await storage.getActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch activities' });
    }
  });

  app.get('/api/activities/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const activity = await storage.getActivity(id);
      
      if (!activity) {
        return res.status(404).json({ message: 'Activity not found' });
      }
      
      res.json(activity);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch activity' });
    }
  });

  app.post('/api/activities', async (req, res) => {
    try {
      const activityData = insertActivitySchema.parse(req.body);
      const newActivity = await storage.createActivity(activityData);
      res.status(201).json(newActivity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create activity' });
    }
  });

  app.put('/api/activities/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const activityData = insertActivitySchema.partial().parse(req.body);
      const updatedActivity = await storage.updateActivity(id, activityData);
      
      if (!updatedActivity) {
        return res.status(404).json({ message: 'Activity not found' });
      }
      
      res.json(updatedActivity);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to update activity' });
    }
  });

  app.delete('/api/activities/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteActivity(id);
      
      if (!success) {
        return res.status(404).json({ message: 'Activity not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete activity' });
    }
  });

  // Partners routes
  app.get('/api/partners', async (_req, res) => {
    try {
      const partners = await storage.getPartners();
      res.json(partners);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch partners' });
    }
  });

  app.get('/api/partners/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const partner = await storage.getPartner(id);
      
      if (!partner) {
        return res.status(404).json({ message: 'Partner not found' });
      }
      
      res.json(partner);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch partner' });
    }
  });

  app.post('/api/partners', async (req, res) => {
    try {
      const partnerData = insertPartnerSchema.parse(req.body);
      const newPartner = await storage.createPartner(partnerData);
      res.status(201).json(newPartner);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create partner' });
    }
  });

  app.put('/api/partners/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const partnerData = insertPartnerSchema.partial().parse(req.body);
      const updatedPartner = await storage.updatePartner(id, partnerData);
      
      if (!updatedPartner) {
        return res.status(404).json({ message: 'Partner not found' });
      }
      
      res.json(updatedPartner);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to update partner' });
    }
  });

  app.delete('/api/partners/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deletePartner(id);
      
      if (!success) {
        return res.status(404).json({ message: 'Partner not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete partner' });
    }
  });

  // Contact Info routes
  app.get('/api/contact-info', async (_req, res) => {
    try {
      const contactInfo = await storage.getContactInfo();
      
      if (!contactInfo) {
        return res.status(404).json({ message: 'Contact info not found' });
      }
      
      res.json(contactInfo);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch contact info' });
    }
  });

  app.put('/api/contact-info', async (req, res) => {
    try {
      const contactInfoData = insertContactInfoSchema.parse(req.body);
      const updatedContactInfo = await storage.updateContactInfo(contactInfoData);
      res.json(updatedContactInfo);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to update contact info' });
    }
  });

  // Contact Submissions routes
  app.get('/api/contact-submissions', async (_req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch contact submissions' });
    }
  });

  app.post('/api/contact-submissions', async (req, res) => {
    try {
      const submissionData = insertContactSubmissionSchema.parse(req.body);
      const newSubmission = await storage.createContactSubmission(submissionData);
      res.status(201).json(newSubmission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create contact submission' });
    }
  });

  app.delete('/api/contact-submissions/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteContactSubmission(id);
      
      if (!success) {
        return res.status(404).json({ message: 'Contact submission not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete contact submission' });
    }
  });

  // Newsletter Subscriptions routes
  app.get('/api/newsletter-subscriptions', async (_req, res) => {
    try {
      const subscriptions = await storage.getNewsletterSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch newsletter subscriptions' });
    }
  });

  app.post('/api/newsletter-subscriptions', async (req, res) => {
    try {
      const subscriptionData = insertNewsletterSubscriptionSchema.parse(req.body);
      const newSubscription = await storage.createNewsletterSubscription(subscriptionData);
      res.status(201).json(newSubscription);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create newsletter subscription' });
    }
  });

  app.delete('/api/newsletter-subscriptions/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteNewsletterSubscription(id);
      
      if (!success) {
        return res.status(404).json({ message: 'Newsletter subscription not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete newsletter subscription' });
    }
  });

  // Areas routes
  app.get('/api/areas', async (_req, res) => {
    try {
      const areas = await storage.getAreas();
      res.json(areas);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch areas' });
    }
  });

  app.get('/api/areas/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const area = await storage.getArea(id);
      
      if (!area) {
        return res.status(404).json({ message: 'Area not found' });
      }
      
      res.json(area);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch area' });
    }
  });

  app.post('/api/areas', async (req, res) => {
    try {
      const areaData = insertAreaSchema.parse(req.body);
      const newArea = await storage.createArea(areaData);
      res.status(201).json(newArea);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to create area' });
    }
  });

  app.put('/api/areas/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const areaData = insertAreaSchema.partial().parse(req.body);
      const updatedArea = await storage.updateArea(id, areaData);
      
      if (!updatedArea) {
        return res.status(404).json({ message: 'Area not found' });
      }
      
      res.json(updatedArea);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to update area' });
    }
  });

  app.delete('/api/areas/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteArea(id);
      
      if (!success) {
        return res.status(404).json({ message: 'Area not found' });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete area' });
    }
  });

  // About Content routes
  app.get('/api/about-content', async (_req, res) => {
    try {
      const aboutContent = await storage.getAboutContent();
      
      if (!aboutContent) {
        return res.status(404).json({ message: 'About content not found' });
      }
      
      res.json(aboutContent);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch about content' });
    }
  });

  app.put('/api/about-content', async (req, res) => {
    try {
      const aboutContentData = insertAboutContentSchema.parse(req.body);
      const updatedAboutContent = await storage.updateAboutContent(aboutContentData);
      res.json(updatedAboutContent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Failed to update about content' });
    }
  });
  
  // Upload image route
  app.post('/api/upload', ensurePublicDirExists, uploadImage);

  const httpServer = createServer(app);
  return httpServer;
}
