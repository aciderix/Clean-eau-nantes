import { apiRequest } from "./queryClient";

// User/Auth API
export async function loginUser(username: string, password: string) {
  const response = await apiRequest("POST", "/api/auth/login", { username, password });
  return response.json();
}

// Approach Items API
export async function getApproachItems() {
  const response = await apiRequest("GET", "/api/approach-items");
  return response.json();
}

export async function createApproachItem(data: any) {
  const response = await apiRequest("POST", "/api/approach-items", data);
  return response.json();
}

export async function updateApproachItem(id: number, data: any) {
  const response = await apiRequest("PUT", `/api/approach-items/${id}`, data);
  return response.json();
}

export async function deleteApproachItem(id: number) {
  await apiRequest("DELETE", `/api/approach-items/${id}`);
  return true;
}

// Events API
export async function getEvents() {
  const response = await apiRequest("GET", "/api/events");
  return response.json();
}

export async function createEvent(data: any) {
  const response = await apiRequest("POST", "/api/events", data);
  return response.json();
}

export async function updateEvent(id: number, data: any) {
  const response = await apiRequest("PUT", `/api/events/${id}`, data);
  return response.json();
}

export async function deleteEvent(id: number) {
  await apiRequest("DELETE", `/api/events/${id}`);
  return true;
}

// Missions API
export async function getMissions() {
  const response = await apiRequest("GET", "/api/missions");
  return response.json();
}

export async function createMission(data: any) {
  const response = await apiRequest("POST", "/api/missions", data);
  return response.json();
}

export async function updateMission(id: number, data: any) {
  const response = await apiRequest("PUT", `/api/missions/${id}`, data);
  return response.json();
}

export async function deleteMission(id: number) {
  await apiRequest("DELETE", `/api/missions/${id}`);
  return true;
}

// Activities API
export async function getActivities() {
  const response = await apiRequest("GET", "/api/activities");
  return response.json();
}

export async function createActivity(data: any) {
  const response = await apiRequest("POST", "/api/activities", data);
  return response.json();
}

export async function updateActivity(id: number, data: any) {
  const response = await apiRequest("PUT", `/api/activities/${id}`, data);
  return response.json();
}

export async function deleteActivity(id: number) {
  await apiRequest("DELETE", `/api/activities/${id}`);
  return true;
}

// Contact Info API
export async function getContactInfo() {
  const response = await apiRequest("GET", "/api/contact-info");
  return response.json();
}

export async function updateContactInfo(data: any) {
  const response = await apiRequest("PUT", "/api/contact-info", data);
  return response.json();
}

// Contact Submissions API
export async function submitContactForm(data: any) {
  const response = await apiRequest("POST", "/api/contact-submissions", data);
  return response.json();
}

export async function getContactSubmissions() {
  const response = await apiRequest("GET", "/api/contact-submissions");
  return response.json();
}

export async function deleteContactSubmission(id: number) {
  await apiRequest("DELETE", `/api/contact-submissions/${id}`);
  return true;
}

// Newsletter Subscriptions API
export async function subscribeToNewsletter(email: string) {
  const response = await apiRequest("POST", "/api/newsletter-subscriptions", { email });
  return response.json();
}

export async function getNewsletterSubscriptions() {
  const response = await apiRequest("GET", "/api/newsletter-subscriptions");
  return response.json();
}

export async function deleteNewsletterSubscription(id: number) {
  await apiRequest("DELETE", `/api/newsletter-subscriptions/${id}`);
  return true;
}

// About Content API
export async function getAboutContent() {
  const response = await apiRequest("GET", "/api/about-content");
  return response.json();
}

export async function updateAboutContent(data: any) {
  const response = await apiRequest("PUT", "/api/about-content", data);
  return response.json();
}

// Partners API
export async function getPartners() {
  const response = await apiRequest("GET", "/api/partners");
  return response.json();
}

export async function createPartner(data: any) {
  const response = await apiRequest("POST", "/api/partners", data);
  return response.json();
}

export async function updatePartner(id: number, data: any) {
  const response = await apiRequest("PUT", `/api/partners/${id}`, data);
  return response.json();
}

export async function deletePartner(id: number) {
  await apiRequest("DELETE", `/api/partners/${id}`);
  return true;
}

// Areas API
export async function getAreas() {
  const response = await apiRequest("GET", "/api/areas");
  return response.json();
}

export async function createArea(data: any) {
  const response = await apiRequest("POST", "/api/areas", data);
  return response.json();
}

export async function updateArea(id: number, data: any) {
  const response = await apiRequest("PUT", `/api/areas/${id}`, data);
  return response.json();
}

export async function deleteArea(id: number) {
  await apiRequest("DELETE", `/api/areas/${id}`);
  return true;
}