/* tslint:disable */
export interface UserDetails {
  email?: string;
  first_name?: string;
  last_name?: string;
  pk?: number;

  /**
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   */
  username: string;
}
