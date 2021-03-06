/* tslint:disable */
import { Comment } from './comment';
import { User } from './user';
import { Group } from './group';
import { Topic } from './topic';
export interface Ticket {
  comments?: Array<Comment>;
  content: string;
  created_at?: string;
  creator: User;
  expiration: string;
  groups: Array<Group>;
  id?: number;
  last_updated?: string;
  last_updated_by: User;
  receivers: Array<User>;
  status?: 'OP' | 'CL' | 'PE' | 'RE' | 'EX';
  title: string;
  topics: Array<Topic>;
}
