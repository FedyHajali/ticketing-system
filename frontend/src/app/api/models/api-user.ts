/* tslint:disable */
export interface ApiUser {
  date_joined?: string;
  email?: string;
  first_name?: string;

  /**
   * The groups this user belongs to. A user will get all permissions granted to each of their groups.
   */
  groups?: Array<number>;
  id?: number;

  /**
   * Designates whether this user should be treated as active. Unselect this instead of deleting accounts.
   */
  is_active?: boolean;

  /**
   * Designates whether the user can log into this admin site.
   */
  is_staff?: boolean;

  /**
   * Designates that this user has all permissions without explicitly assigning them.
   */
  is_superuser?: boolean;
  last_login?: null | string;
  last_name?: string;
  password: string;

  /**
   * Specific permissions for this user.
   */
  user_permissions?: Array<number>;

  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}
