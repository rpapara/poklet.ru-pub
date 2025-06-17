// src/store/client.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ClientStore {
  clientId: string;
  name: string | null;
  setName: (name: string) => void;
}

export const useClientStore = create<ClientStore>()(
  persist(
    (set) => ({
      clientId: crypto.randomUUID(),
      name: null,
      setName: (name) => set({ name }),
    }),
    {
      name: 'client-storage',
      partialize: (state) => ({
        clientId: state.clientId,
        name: state.name,
      }),
    },
  ),
);
