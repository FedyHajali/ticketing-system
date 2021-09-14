/* tslint:disable */
import { ApiGroup } from './api-group';
import { ApiUser } from './api-user';
export interface Topic {
  description: string;
  group: ApiGroup;
  id?: number;
  name: string;
  users: Array<ApiUser>;
}
