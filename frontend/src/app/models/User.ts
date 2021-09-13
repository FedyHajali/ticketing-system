import { Group } from './Group';

export class User {
  pk?: number;
  username: string = '';
  password?: string = '';
  email: string = '';
  first_name: string = '';
  last_name: string = '';
  groups: Array<Group> = [];
  is_staff: boolean = false;
}
