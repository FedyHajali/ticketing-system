import { Group } from './Group';
import { Topic } from './Topic';
import { User } from './User';

export class Ticket {
  pk?: number;
  title: string = '';
  content: string = '';
  status: string = '';
  creator: User = new User();
  created_at: Date = new Date();
  expiration: Date = new Date();
  receivers: Array<User> = [];
  groups: Array<Group> = [];
  comments: Array<Comment> = [];
  topics: Array<Topic> = [];
  uploads: Array<number> = [];
}
