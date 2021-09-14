/* tslint:disable */
import { Group } from './group';
import { User } from './user';
export interface Topic {
  description: string;
  group: Group;
  id?: number;
  name: string;
  users: Array<User>;
}
