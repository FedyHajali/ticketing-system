import { Group } from './Group';
import { User } from './User';

export interface Topic {
  name: string | null;
  description: string | null;
  group: Group | null;
  users: Array<User> | null;
}
