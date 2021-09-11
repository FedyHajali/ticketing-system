export interface User {
  id: number | null;
  username: string;
  password: string | null;
  email: string;
  first_name: string;
  last_name: string;
  groups: Array<Object>;
  is_staff: boolean;
}
