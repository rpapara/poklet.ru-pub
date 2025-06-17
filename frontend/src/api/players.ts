import { api } from './axios';

export async function vote(client_id: string, vote: string): Promise<void> {
  await api.patch(`/players/${client_id}/vote/`, { vote });
}
