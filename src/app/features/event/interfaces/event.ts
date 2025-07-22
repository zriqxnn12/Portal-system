import { User } from '@features/user-profile/interfaces/user-profile';

export interface Event {
  id: number;
  type_name: string;
  title: string;
  file_path: string;
  address: string;
  date: string;
  quota: number;
  type: number;
  fee: string;
  start_time: string;
  end_time: string;
  description: string;
}

export interface EventParticipant {
  id: number;
  status_name: string;
  event_id: number;
  user_id: number;
  status: number;
  total: string;
  file_path: string;
  created_at: string;
  updated_at: string;
  user: User;
  event: Event;
}
