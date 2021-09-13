import { Group } from './Group';
import { User } from './User';

export class Topic {
  pk?: number
  name: string = '';
  description: string = '';
  group: Group = new Group();
  users: Array<User> = [];
}
