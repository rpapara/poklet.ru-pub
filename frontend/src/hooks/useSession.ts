// src/hooks/useSession.ts
import useSWR from 'swr';
import { getSessionById } from '../api/sessions';
import type { Session } from '../types/session';

const fetcher = (id: string) => getSessionById(id);

export function useSession(id?: string) {
  const { data, error, isLoading, mutate } = useSWR<Session>(
    id ? ['session', id] : null,
    () => fetcher(id!),
    {
      refreshInterval: 3000,
      revalidateOnFocus: false,
    },
  );

  const clearError = () => {
    mutate();
  };

  return {
    session: data ?? null,
    players: data?.players ?? [],
    loading: isLoading,
    sessionErrorCode: error ? 'error.session_load_failed' : null,
    clearError,
    refetch: mutate,
  };
}
