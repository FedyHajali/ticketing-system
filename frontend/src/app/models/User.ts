export class User {
  pk?: number;
  username: string = '';
  password?: string = '';
  email: string = '';
  first_name: string = '';
  last_name: string = '';
  groups: Array<Object> = [];
  is_staff: boolean = false;
}
