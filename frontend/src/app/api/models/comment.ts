/* tslint:disable */
import { User } from './user';
export interface Comment {
  content: string;
  created_at?: string;
  creator: User;
  id?: number;
  ticket?: string;
  title: string;
}
