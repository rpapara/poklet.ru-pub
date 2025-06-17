// src/hooks/useJoinSession.ts
import type { AxiosError } from 'axios';
import { useState } from 'react';
import { joinSession } from '../api/sessions';
import type { Player } from '../types/session';

export function useJoinSession() {
  const [loading, setLoading] = useState(false);
  const [player, setPlayer] = useState<(Player & { isYou: boolean }) | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  const join = async (id: string, name: string, clientId: string) => {
    setLoading(true);
    setError(null);
    setErrorCode(null);
    try {
      const joinedPlayer: Player = await joinSession(id, name, clientId);
      setPlayer({ ...joinedPlayer, isYou: true });
    } catch (e) {
      const err = e as AxiosError<{ detail?: string; code?: string }>;
      const data = err.response?.data;
      setError(data?.detail || 'Failed to join session');
      setErrorCode(typeof data?.code === 'string' ? data.code : null);
    } finally {
      setLoading(false);
    }
  };

  return { join, player, loading, error, errorCode };
}
