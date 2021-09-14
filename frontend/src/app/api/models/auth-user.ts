/* tslint:disable */
import { Group } from './group';
export interface AuthUser {
  email?: string;
  first_name?: string;
  groups: Array<Group>;
  id?: number;

  /**
   * Designates whether the user can log into this admin site.
   */
  is_staff?: boolean;
  last_name?: string;
  password: string;

  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}
