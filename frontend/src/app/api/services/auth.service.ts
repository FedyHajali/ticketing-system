/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Group } from '../models/group';
import { User } from '../models/user';
import { Login } from '../models/login';
import { PasswordChange } from '../models/password-change';
import { PasswordReset } from '../models/password-reset';
import { PasswordResetConfirm } from '../models/password-reset-confirm';
import { UserDetails } from '../models/user-details';
@Injectable({
  providedIn: 'root',
})
class AuthService extends __BaseService {
  static readonly authGroupsAddUserUpdatePath = '/auth/groups/add-user/{group_id}';
  static readonly authGroupsCreateCreatePath = '/auth/groups/create/';
  static readonly authGroupsDeleteUserUpdatePath = '/auth/groups/delete-user/{group_id}';
  static readonly authGroupsDeleteDeletePath = '/auth/groups/delete/{group_id}';
  static readonly authGroupsListUserListPath = '/auth/groups/list-user/';
  static readonly authGroupsListListPath = '/auth/groups/list/';
  static readonly authGroupsUserListReadPath = '/auth/groups/user-list/{group_id}/';
  static readonly authLoginCreatePath = '/auth/login/';
  static readonly authLogoutListPath = '/auth/logout/';
  static readonly authLogoutCreatePath = '/auth/logout/';
  static readonly authPasswordChangeCreatePath = '/auth/password/change/';
  static readonly authPasswordResetCreatePath = '/auth/password/reset/';
  static readonly authPasswordResetConfirmCreatePath = '/auth/password/reset/confirm/';
  static readonly authUserReadPath = '/auth/user/';
  static readonly authUserUpdatePath = '/auth/user/';
  static readonly authUserPartialUpdatePath = '/auth/user/';
  static readonly authUsersDetailListPath = '/auth/users/detail/';
  static readonly authUsersRegistrationCreatePath = '/auth/users/registration/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Add user to Group
   *
   * Subscribe user to group
   * @param group_id undefined
   */
  authGroupsAddUserUpdateResponse(groupId: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/auth/groups/add-user/${encodeURIComponent(String(groupId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Add user to Group
   *
   * Subscribe user to group
   * @param group_id undefined
   */
  authGroupsAddUserUpdate(groupId: string): __Observable<null> {
    return this.authGroupsAddUserUpdateResponse(groupId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Create Group (only SuperUser)
   *
   * Creation of a new Group (only SuperUser)
   * @param data undefined
   * @return Created
   */
  authGroupsCreateCreateResponse(data: Group): __Observable<__StrictHttpResponse<Group>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/groups/create/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Group>;
      })
    );
  }
  /**
   * Create Group (only SuperUser)
   *
   * Creation of a new Group (only SuperUser)
   * @param data undefined
   * @return Created
   */
  authGroupsCreateCreate(data: Group): __Observable<Group> {
    return this.authGroupsCreateCreateResponse(data).pipe(
      __map(_r => _r.body as Group)
    );
  }

  /**
   * Remove user from Group
   *
   * Unsubscribe user from group
   * @param group_id undefined
   */
  authGroupsDeleteUserUpdateResponse(groupId: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/auth/groups/delete-user/${encodeURIComponent(String(groupId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Remove user from Group
   *
   * Unsubscribe user from group
   * @param group_id undefined
   */
  authGroupsDeleteUserUpdate(groupId: string): __Observable<null> {
    return this.authGroupsDeleteUserUpdateResponse(groupId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Delete Group (only SuperUser)
   *
   * Delete a Group (only SuperUser)
   * @param group_id undefined
   */
  authGroupsDeleteDeleteResponse(groupId: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/auth/groups/delete/${encodeURIComponent(String(groupId))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Delete Group (only SuperUser)
   *
   * Delete a Group (only SuperUser)
   * @param group_id undefined
   */
  authGroupsDeleteDelete(groupId: string): __Observable<null> {
    return this.authGroupsDeleteDeleteResponse(groupId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * List Groups of active user
   *
   * List of all groups of active user
   * @return OK
   */
  authGroupsListUserListResponse(): __Observable<__StrictHttpResponse<Array<Group>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/auth/groups/list-user/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Group>>;
      })
    );
  }
  /**
   * List Groups of active user
   *
   * List of all groups of active user
   * @return OK
   */
  authGroupsListUserList(): __Observable<Array<Group>> {
    return this.authGroupsListUserListResponse().pipe(
      __map(_r => _r.body as Array<Group>)
    );
  }

  /**
   * List all Groups
   *
   * List of all available groups
   * @return OK
   */
  authGroupsListListResponse(): __Observable<__StrictHttpResponse<Array<Group>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/auth/groups/list/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Group>>;
      })
    );
  }
  /**
   * List all Groups
   *
   * List of all available groups
   * @return OK
   */
  authGroupsListList(): __Observable<Array<Group>> {
    return this.authGroupsListListResponse().pipe(
      __map(_r => _r.body as Array<Group>)
    );
  }

  /**
   * List users of group
   *
   * List all users of a group
   * @param group_id undefined
   * @return OK
   */
  authGroupsUserListReadResponse(groupId: string): __Observable<__StrictHttpResponse<Array<User>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/auth/groups/user-list/${encodeURIComponent(String(groupId))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<User>>;
      })
    );
  }
  /**
   * List users of group
   *
   * List all users of a group
   * @param group_id undefined
   * @return OK
   */
  authGroupsUserListRead(groupId: string): __Observable<Array<User>> {
    return this.authGroupsUserListReadResponse(groupId).pipe(
      __map(_r => _r.body as Array<User>)
    );
  }

  /**
   * Check the credentials and return the REST Token
   * if the credentials are valid and authenticated.
   * Calls Django Auth login method to register User ID
   * in Django session framework
   *
   * Accept the following POST parameters: username, password
   * Return the REST Framework Token Object's key.
   * @param data undefined
   */
  authLoginCreateResponse(data: Login): __Observable<__StrictHttpResponse<Login>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/login/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Login>;
      })
    );
  }
  /**
   * Check the credentials and return the REST Token
   * if the credentials are valid and authenticated.
   * Calls Django Auth login method to register User ID
   * in Django session framework
   *
   * Accept the following POST parameters: username, password
   * Return the REST Framework Token Object's key.
   * @param data undefined
   */
  authLoginCreate(data: Login): __Observable<Login> {
    return this.authLoginCreateResponse(data).pipe(
      __map(_r => _r.body as Login)
    );
  }

  /**
   * Calls Django logout method and delete the Token object
   * assigned to the current User object.
   *
   * Accepts/Returns nothing.
   */
  authLogoutListResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/auth/logout/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Calls Django logout method and delete the Token object
   * assigned to the current User object.
   *
   * Accepts/Returns nothing.
   */
  authLogoutList(): __Observable<null> {
    return this.authLogoutListResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Calls Django logout method and delete the Token object
   * assigned to the current User object.
   *
   * Accepts/Returns nothing.
   */
  authLogoutCreateResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/logout/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Calls Django logout method and delete the Token object
   * assigned to the current User object.
   *
   * Accepts/Returns nothing.
   */
  authLogoutCreate(): __Observable<null> {
    return this.authLogoutCreateResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Calls Django Auth SetPasswordForm save method.
   *
   * Accepts the following POST parameters: new_password1, new_password2
   * Returns the success/fail message.
   * @param data undefined
   */
  authPasswordChangeCreateResponse(data: PasswordChange): __Observable<__StrictHttpResponse<PasswordChange>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/password/change/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PasswordChange>;
      })
    );
  }
  /**
   * Calls Django Auth SetPasswordForm save method.
   *
   * Accepts the following POST parameters: new_password1, new_password2
   * Returns the success/fail message.
   * @param data undefined
   */
  authPasswordChangeCreate(data: PasswordChange): __Observable<PasswordChange> {
    return this.authPasswordChangeCreateResponse(data).pipe(
      __map(_r => _r.body as PasswordChange)
    );
  }

  /**
   * Calls Django Auth PasswordResetForm save method.
   *
   * Accepts the following POST parameters: email
   * Returns the success/fail message.
   * @param data undefined
   */
  authPasswordResetCreateResponse(data: PasswordReset): __Observable<__StrictHttpResponse<PasswordReset>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/password/reset/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PasswordReset>;
      })
    );
  }
  /**
   * Calls Django Auth PasswordResetForm save method.
   *
   * Accepts the following POST parameters: email
   * Returns the success/fail message.
   * @param data undefined
   */
  authPasswordResetCreate(data: PasswordReset): __Observable<PasswordReset> {
    return this.authPasswordResetCreateResponse(data).pipe(
      __map(_r => _r.body as PasswordReset)
    );
  }

  /**
   * Password reset e-mail link is confirmed, therefore
   * this resets the user's password.
   *
   * Accepts the following POST parameters: token, uid,
   *     new_password1, new_password2
   * Returns the success/fail message.
   * @param data undefined
   */
  authPasswordResetConfirmCreateResponse(data: PasswordResetConfirm): __Observable<__StrictHttpResponse<PasswordResetConfirm>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/password/reset/confirm/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<PasswordResetConfirm>;
      })
    );
  }
  /**
   * Password reset e-mail link is confirmed, therefore
   * this resets the user's password.
   *
   * Accepts the following POST parameters: token, uid,
   *     new_password1, new_password2
   * Returns the success/fail message.
   * @param data undefined
   */
  authPasswordResetConfirmCreate(data: PasswordResetConfirm): __Observable<PasswordResetConfirm> {
    return this.authPasswordResetConfirmCreateResponse(data).pipe(
      __map(_r => _r.body as PasswordResetConfirm)
    );
  }

  /**
   * Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   *
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   *
   * Returns UserModel fields.
   */
  authUserReadResponse(): __Observable<__StrictHttpResponse<UserDetails>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/auth/user/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserDetails>;
      })
    );
  }
  /**
   * Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   *
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   *
   * Returns UserModel fields.
   */
  authUserRead(): __Observable<UserDetails> {
    return this.authUserReadResponse().pipe(
      __map(_r => _r.body as UserDetails)
    );
  }

  /**
   * Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   *
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   *
   * Returns UserModel fields.
   * @param data undefined
   */
  authUserUpdateResponse(data: UserDetails): __Observable<__StrictHttpResponse<UserDetails>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/auth/user/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserDetails>;
      })
    );
  }
  /**
   * Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   *
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   *
   * Returns UserModel fields.
   * @param data undefined
   */
  authUserUpdate(data: UserDetails): __Observable<UserDetails> {
    return this.authUserUpdateResponse(data).pipe(
      __map(_r => _r.body as UserDetails)
    );
  }

  /**
   * Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   *
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   *
   * Returns UserModel fields.
   * @param data undefined
   */
  authUserPartialUpdateResponse(data: UserDetails): __Observable<__StrictHttpResponse<UserDetails>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/auth/user/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<UserDetails>;
      })
    );
  }
  /**
   * Reads and updates UserModel fields
   * Accepts GET, PUT, PATCH methods.
   *
   * Default accepted fields: username, first_name, last_name
   * Default display fields: pk, username, email, first_name, last_name
   * Read-only fields: pk, email
   *
   * Returns UserModel fields.
   * @param data undefined
   */
  authUserPartialUpdate(data: UserDetails): __Observable<UserDetails> {
    return this.authUserPartialUpdateResponse(data).pipe(
      __map(_r => _r.body as UserDetails)
    );
  }

  /**
   * Get User Info
   *
   * Retrieve all User Information
   * @return OK
   */
  authUsersDetailListResponse(): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/auth/users/detail/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }
  /**
   * Get User Info
   *
   * Retrieve all User Information
   * @return OK
   */
  authUsersDetailList(): __Observable<User> {
    return this.authUsersDetailListResponse().pipe(
      __map(_r => _r.body as User)
    );
  }

  /**
   * Create User
   *
   * Registration of a new user
   * @param data undefined
   * @return Created
   */
  authUsersRegistrationCreateResponse(data: User): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/users/registration/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }
  /**
   * Create User
   *
   * Registration of a new user
   * @param data undefined
   * @return Created
   */
  authUsersRegistrationCreate(data: User): __Observable<User> {
    return this.authUsersRegistrationCreateResponse(data).pipe(
      __map(_r => _r.body as User)
    );
  }
}

module AuthService {
}

export { AuthService }
