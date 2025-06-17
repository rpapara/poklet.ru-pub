import { useState } from 'react';
import { revealSession } from '../api/sessions';
import type { AxiosError } from 'axios';

export function useRevealSession(shortId: string, refetch?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reveal = async () => {
    setLoading(true);
    setError(null);
    try {
      await revealSession(shortId);
      if (refetch) {
        refetch();
      }
    } catch (e) {
      const err = e as AxiosError<{ detail?: string }>;
      setError(err.response?.data?.detail || 'Failed to reveal session');
    } finally {
      setLoading(false);
    }
  };

  return { reveal, loading, error };
}
