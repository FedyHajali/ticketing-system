/* tslint:disable */
import { Comment } from './comment';
import { ApiUser } from './api-user';
import { ApiGroup } from './api-group';
import { Topic } from './topic';
export interface Ticket {
  comments: Array<Comment>;
  content: string;
  created_at?: string;
  creator: ApiUser;
  expiration: string;
  groups: Array<ApiGroup>;
  id?: number;
  receivers: Array<ApiUser>;
  status?: 'OP' | 'CL' | 'PE' | 'RE' | 'EX';
  title: string;
  topics: Array<Topic>;
  uploads?: Array<number>;
}
