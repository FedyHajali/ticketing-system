import { Group } from './Group';
import { Topic } from './Topic';
import { User } from './User';

export interface Ticket {
  id: number | null;
  title: string | null;
  content: string | null;
  creator: User;
  created_at: Date | null;
  expiration: Date | null;
  status: string | null;
  receivers: Array<User> | null;
  groups: Array<Group> | null;
  comments: Array<Comment> | null;
  topics: Array<Topic> | null;
  uploads: Array<number> | null;
}
