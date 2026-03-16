export interface Booking {
  id: string;
  name: string;
  email: string;
  date: string;
  time: string;
  duration: number;
  message: string;
  meet_link?: string;
  status: 'confirmed' | 'cancelled';
  created_at: string;
}

export interface OwnerSettings {
  id: string;
  google_access_token?: string;
  google_refresh_token?: string;
  google_token_expiry?: string;
  available_start: string;
  available_end: string;
  slot_duration: number;
  timezone: string;
}
