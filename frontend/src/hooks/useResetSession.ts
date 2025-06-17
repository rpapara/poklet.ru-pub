import { useState } from 'react';
import { resetSession } from '../api/sessions';
import type { AxiosError } from 'axios';

export function useResetSession(shortId: string, refetch?: () => void) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = async () => {
    setLoading(true);
    setError(null);
    try {
      await resetSession(shortId);
      if (refetch) refetch();
    } catch (e) {
      const err = e as AxiosError<{ detail?: string }>;
      setError(err.response?.data?.detail || 'Failed to reset session');
    } finally {
      setLoading(false);
    }
  };

  return { reset, loading, error };
}
