// src/api/sessions.ts
import { api } from './axios';
import type { Session, Player } from '../types/session';

export async function getSessionById(id: string): Promise<Session> {
  const response = await api.get(`/sessions/${id}/`);
  return response.data;
}

export async function createSession(): Promise<Session> {
  const response = await api.post('/sessions/');
  return response.data;
}

export async function joinSession(id: string, name: string, client_id: string): Promise<Player> {
  const response = await api.post(`/sessions/${id}/join/`, { name, client_id });
  return response.data;
}

export async function revealSession(id: string): Promise<void> {
  await api.post(`/sessions/${id}/reveal/`);
}

export async function resetSession(id: string): Promise<void> {
  await api.post(`/sessions/${id}/reset/`);
}
