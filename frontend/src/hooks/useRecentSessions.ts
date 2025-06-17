// src/hooks/useRecentSessions.ts
import { useCallback, useEffect, useState } from 'react';

export interface StoredSession {
  short_id: string;
  created_at: string;
}

const STORAGE_KEY = 'recent_sessions';
const MAX_SESSIONS = 5;

export function useRecentSessions() {
  const [sessions, setSessions] = useState<StoredSession[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed: StoredSession[] = JSON.parse(raw);
        setSessions(parsed);
      } catch (e) {
        console.error('Failed to parse recent_sessions from localStorage', e);
      }
    }
  }, []);

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const newSessions = JSON.parse(e.newValue) as StoredSession[];
          setSessions((prev) => {
            const prevIds = prev.map((s) => s.short_id).join(',');
            const newIds = newSessions.map((s) => s.short_id).join(',');
            return prevIds === newIds ? prev : newSessions;
          });
        } catch (error) {
          console.error('Failed to sync recent_sessions from localStorage', error);
        }
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const addSession = useCallback((session: StoredSession) => {
    setSessions((prevSessions) => {
      const filtered = prevSessions.filter((s) => s.short_id !== session.short_id);
      const updated = [session, ...filtered].slice(0, MAX_SESSIONS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { sessions, addSession };
}
