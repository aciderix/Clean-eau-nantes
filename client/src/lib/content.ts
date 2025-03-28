import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";

// Types from the backend
export interface Section {
  id: number;
  key: string;
  title: string;
  content: any;
  updatedAt: string;
}

export interface Approach {
  id: number;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export interface Event {
  id: number;
  dateText: string;
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
  order: number;
}

export interface Mission {
  id: number;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  image: string;
  linkText: string;
  linkUrl: string;
  imageRight: boolean;
  order: number;
}

export interface Area {
  id: number;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export interface Partner {
  id: number;
  name: string;
  logo: string;
  website?: string;
  order: number;
}

export interface Contact {
  id: number;
  email: string;
  address: string;
  meetingInfo: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

export interface SupportOption {
  id: number;
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  order: number;
}

export interface FormSubmission {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

export interface ContentData {
  about?: Section;
  approaches: Approach[];
  events: Event[];
  missions: Mission[];
  activities: Activity[];
  areas: Area[];
  partners: Partner[];
  contact?: Contact;
  supportOptions: SupportOption[];
}

// Function to fetch all content for the homepage
export async function fetchContent(): Promise<ContentData> {
  const response = await fetch('/api/content');
  if (!response.ok) {
    throw new Error('Failed to fetch content');
  }
  return response.json();
}

// Admin functions for content management

// Approaches
export async function createApproach(approach: Omit<Approach, 'id'>): Promise<Approach> {
  const res = await apiRequest('POST', '/api/admin/approaches', approach);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.approach;
}

export async function updateApproach(id: number, approach: Partial<Omit<Approach, 'id'>>): Promise<Approach> {
  const res = await apiRequest('PUT', `/api/admin/approaches/${id}`, approach);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.approach;
}

export async function deleteApproach(id: number): Promise<boolean> {
  const res = await apiRequest('DELETE', `/api/admin/approaches/${id}`);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.success;
}

// Events
export async function createEvent(event: Omit<Event, 'id'>): Promise<Event> {
  const res = await apiRequest('POST', '/api/admin/events', event);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.event;
}

export async function updateEvent(id: number, event: Partial<Omit<Event, 'id'>>): Promise<Event> {
  const res = await apiRequest('PUT', `/api/admin/events/${id}`, event);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.event;
}

export async function deleteEvent(id: number): Promise<boolean> {
  const res = await apiRequest('DELETE', `/api/admin/events/${id}`);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.success;
}

// Missions
export async function createMission(mission: Omit<Mission, 'id'>): Promise<Mission> {
  const res = await apiRequest('POST', '/api/admin/missions', mission);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.mission;
}

export async function updateMission(id: number, mission: Partial<Omit<Mission, 'id'>>): Promise<Mission> {
  const res = await apiRequest('PUT', `/api/admin/missions/${id}`, mission);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.mission;
}

export async function deleteMission(id: number): Promise<boolean> {
  const res = await apiRequest('DELETE', `/api/admin/missions/${id}`);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.success;
}

// Activities
export async function createActivity(activity: Omit<Activity, 'id'>): Promise<Activity> {
  const res = await apiRequest('POST', '/api/admin/activities', activity);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.activity;
}

export async function updateActivity(id: number, activity: Partial<Omit<Activity, 'id'>>): Promise<Activity> {
  const res = await apiRequest('PUT', `/api/admin/activities/${id}`, activity);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.activity;
}

export async function deleteActivity(id: number): Promise<boolean> {
  const res = await apiRequest('DELETE', `/api/admin/activities/${id}`);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.success;
}

// Areas
export async function createArea(area: Omit<Area, 'id'>): Promise<Area> {
  const res = await apiRequest('POST', '/api/admin/areas', area);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.area;
}

export async function updateArea(id: number, area: Partial<Omit<Area, 'id'>>): Promise<Area> {
  const res = await apiRequest('PUT', `/api/admin/areas/${id}`, area);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.area;
}

export async function deleteArea(id: number): Promise<boolean> {
  const res = await apiRequest('DELETE', `/api/admin/areas/${id}`);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.success;
}

// Partners
export async function createPartner(partner: Omit<Partner, 'id'>): Promise<Partner> {
  const res = await apiRequest('POST', '/api/admin/partners', partner);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.partner;
}

export async function updatePartner(id: number, partner: Partial<Omit<Partner, 'id'>>): Promise<Partner> {
  const res = await apiRequest('PUT', `/api/admin/partners/${id}`, partner);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.partner;
}

export async function deletePartner(id: number): Promise<boolean> {
  const res = await apiRequest('DELETE', `/api/admin/partners/${id}`);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.success;
}

// Contact
export async function updateContact(contact: Omit<Contact, 'id'>): Promise<Contact> {
  const res = await apiRequest('PUT', '/api/admin/contact', contact);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.contact;
}

// Support Options
export async function createSupportOption(option: Omit<SupportOption, 'id'>): Promise<SupportOption> {
  const res = await apiRequest('POST', '/api/admin/support-options', option);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.option;
}

export async function updateSupportOption(id: number, option: Partial<Omit<SupportOption, 'id'>>): Promise<SupportOption> {
  const res = await apiRequest('PUT', `/api/admin/support-options/${id}`, option);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.option;
}

export async function deleteSupportOption(id: number): Promise<boolean> {
  const res = await apiRequest('DELETE', `/api/admin/support-options/${id}`);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return data.success;
}

// Form submissions
export async function submitContactForm(formData: { 
  name: string; 
  email: string; 
  subject: string; 
  message: string; 
}): Promise<{ success: boolean }> {
  const res = await apiRequest('POST', '/api/contact', formData);
  const data = await res.json();
  return data;
}

export async function getFormSubmissions(): Promise<FormSubmission[]> {
  const res = await apiRequest('GET', '/api/admin/form-submissions');
  const data = await res.json();
  return data.submissions;
}

export async function markFormSubmissionAsRead(id: number): Promise<FormSubmission> {
  const res = await apiRequest('PUT', `/api/admin/form-submissions/${id}/read`);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/admin/form-submissions'] });
  return data.submission;
}

export async function deleteFormSubmission(id: number): Promise<boolean> {
  const res = await apiRequest('DELETE', `/api/admin/form-submissions/${id}`);
  const data = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/admin/form-submissions'] });
  return data.success;
}

// Section content (about, etc.)
export async function updateSection(key: string, data: { title: string, content: any }): Promise<Section> {
  const res = await apiRequest('PUT', `/api/admin/sections/${key}`, data);
  const responseData = await res.json();
  queryClient.invalidateQueries({ queryKey: ['/api/content'] });
  return responseData.section;
}
