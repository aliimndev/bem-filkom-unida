/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/** Contact message payload and response types */
export interface ContactMessageInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ContactMessage extends ContactMessageInput {
  id: string;
  createdAt: string; // ISO timestamp
}

export interface ContactCreateResponse {
  ok: true;
  message: ContactMessage;
}

export interface ContactListResponse {
  ok: true;
  messages: ContactMessage[];
}
