export interface Player {
  id: string;
  name: string;
  client_id: string;
  vote: string | null;
  has_voted: boolean;
  joined_at: string;
}

export interface Session {
  id: string;
  short_id: string;
  created_at: string;
  players: Player[];
  revealed: boolean;
}

export type CardValue = '0' | '1' | '2' | '3' | '5' | '8' | '13' | '20' | '∞' | '?' | '☕';
