/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Comment } from '../models/comment';
import { Ticket } from '../models/ticket';
import { ApiUser } from '../models/api-user';
import { Topic } from '../models/topic';
@Injectable({
  providedIn: 'root',
})
class ApiService extends __BaseService {
  static readonly apiCommentCreateCreatePath = '/api/comment-create/';
  static readonly apiCommentDetailReadPath = '/api/comment-detail/{id}';
  static readonly apiCommentTicketListReadPath = '/api/comment-ticket-list/{id}';
  static readonly apiTicketCreateCreatePath = '/api/ticket-create/';
  static readonly apiTicketCreatorUpdateUpdatePath = '/api/ticket-creator-update/{id}/';
  static readonly apiTicketDeleteDeletePath = '/api/ticket-delete/{id}/';
  static readonly apiTicketDetailReadPath = '/api/ticket-detail/{id}/';
  static readonly apiTicketListCreatorReadPath = '/api/ticket-list-creator/{id}';
  static readonly apiTicketListGroupReadPath = '/api/ticket-list-group/{id}';
  static readonly apiTicketListListPath = '/api/ticket-list/';
  static readonly apiTicketReceiverUpdateUpdatePath = '/api/ticket-receiver-update/{id}/';
  static readonly apiTicketReceiversListReadPath = '/api/ticket-receivers-list/{id}';
  static readonly apiTicketStaffUpdateUpdatePath = '/api/ticket-staff-update/{id}/';
  static readonly apiTopicCreateCreatePath = '/api/topic-create/';
  static readonly apiTopicDetailReadPath = '/api/topic-detail/{id}';
  static readonly apiTopicGroupListReadPath = '/api/topic-group-list/{id}';
  static readonly apiTopicNotStaffListListPath = '/api/topic-not-staff-list/';
  static readonly apiTopicUserAddUpdatePath = '/api/topic-user-add/{id}';
  static readonly apiTopicUserGroupListReadPath = '/api/topic-user-group-list/{id}';
  static readonly apiTopicUserListListPath = '/api/topic-user-list/';
  static readonly apiTopicUsersReadPath = '/api/topic-users/{id}/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Add comment to ticket
   *
   * Add a comment to a ticket
   * @param data undefined
   * @return Created
   */
  apiCommentCreateCreateResponse(data: Comment): __Observable<__StrictHttpResponse<Comment>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/comment-create/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Comment>;
      })
    );
  }
  /**
   * Add comment to ticket
   *
   * Add a comment to a ticket
   * @param data undefined
   * @return Created
   */
  apiCommentCreateCreate(data: Comment): __Observable<Comment> {
    return this.apiCommentCreateCreateResponse(data).pipe(
      __map(_r => _r.body as Comment)
    );
  }

  /**
   * Get comment info
   *
   * Retrieve all comment information
   * @param id undefined
   * @return OK
   */
  apiCommentDetailReadResponse(id: string): __Observable<__StrictHttpResponse<Comment>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/comment-detail/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Comment>;
      })
    );
  }
  /**
   * Get comment info
   *
   * Retrieve all comment information
   * @param id undefined
   * @return OK
   */
  apiCommentDetailRead(id: string): __Observable<Comment> {
    return this.apiCommentDetailReadResponse(id).pipe(
      __map(_r => _r.body as Comment)
    );
  }

  /**
   * List of Comments of a Ticket
   *
   * List of Comments of a particular Ticket
   * @param id undefined
   * @return OK
   */
  apiCommentTicketListReadResponse(id: string): __Observable<__StrictHttpResponse<Array<Comment>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/comment-ticket-list/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Comment>>;
      })
    );
  }
  /**
   * List of Comments of a Ticket
   *
   * List of Comments of a particular Ticket
   * @param id undefined
   * @return OK
   */
  apiCommentTicketListRead(id: string): __Observable<Array<Comment>> {
    return this.apiCommentTicketListReadResponse(id).pipe(
      __map(_r => _r.body as Array<Comment>)
    );
  }

  /**
   * Ticket Creation
   *
   * Creation of a new Ticket
   * @param data undefined
   * @return Created
   */
  apiTicketCreateCreateResponse(data: Ticket): __Observable<__StrictHttpResponse<Ticket>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/ticket-create/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Ticket>;
      })
    );
  }
  /**
   * Ticket Creation
   *
   * Creation of a new Ticket
   * @param data undefined
   * @return Created
   */
  apiTicketCreateCreate(data: Ticket): __Observable<Ticket> {
    return this.apiTicketCreateCreateResponse(data).pipe(
      __map(_r => _r.body as Ticket)
    );
  }

  /**
   * Ticket status update for Creator
   *
   * Change of ticket status for creator who can only put Closed or Open
   * @param params The `ApiService.ApiTicketCreatorUpdateUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   *
   * @return OK
   */
  apiTicketCreatorUpdateUpdateResponse(params: ApiService.ApiTicketCreatorUpdateUpdateParams): __Observable<__StrictHttpResponse<Ticket>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/ticket-creator-update/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Ticket>;
      })
    );
  }
  /**
   * Ticket status update for Creator
   *
   * Change of ticket status for creator who can only put Closed or Open
   * @param params The `ApiService.ApiTicketCreatorUpdateUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   *
   * @return OK
   */
  apiTicketCreatorUpdateUpdate(params: ApiService.ApiTicketCreatorUpdateUpdateParams): __Observable<Ticket> {
    return this.apiTicketCreatorUpdateUpdateResponse(params).pipe(
      __map(_r => _r.body as Ticket)
    );
  }

  /**
   * Delete of a ticket
   *
   * Delete of a ticket
   * @param id undefined
   */
  apiTicketDeleteDeleteResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/ticket-delete/${encodeURIComponent(String(id))}/`,
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
   * Delete of a ticket
   *
   * Delete of a ticket
   * @param id undefined
   */
  apiTicketDeleteDelete(id: string): __Observable<null> {
    return this.apiTicketDeleteDeleteResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Ticket detail
   *
   * Returns all information of a ticket
   * @param id undefined
   * @return OK
   */
  apiTicketDetailReadResponse(id: string): __Observable<__StrictHttpResponse<Ticket>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ticket-detail/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Ticket>;
      })
    );
  }
  /**
   * Ticket detail
   *
   * Returns all information of a ticket
   * @param id undefined
   * @return OK
   */
  apiTicketDetailRead(id: string): __Observable<Ticket> {
    return this.apiTicketDetailReadResponse(id).pipe(
      __map(_r => _r.body as Ticket)
    );
  }

  /**
   * Ticket list created by the active user
   *
   * List of tickets for which the active user is a creator
   * @param id undefined
   * @return OK
   */
  apiTicketListCreatorReadResponse(id: string): __Observable<__StrictHttpResponse<Array<Ticket>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ticket-list-creator/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Ticket>>;
      })
    );
  }
  /**
   * Ticket list created by the active user
   *
   * List of tickets for which the active user is a creator
   * @param id undefined
   * @return OK
   */
  apiTicketListCreatorRead(id: string): __Observable<Array<Ticket>> {
    return this.apiTicketListCreatorReadResponse(id).pipe(
      __map(_r => _r.body as Array<Ticket>)
    );
  }

  /**
   * Ticket list for a specific group
   *
   * List of tickets for a specific group
   * @param id undefined
   * @return OK
   */
  apiTicketListGroupReadResponse(id: string): __Observable<__StrictHttpResponse<Array<Ticket>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ticket-list-group/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Ticket>>;
      })
    );
  }
  /**
   * Ticket list for a specific group
   *
   * List of tickets for a specific group
   * @param id undefined
   * @return OK
   */
  apiTicketListGroupRead(id: string): __Observable<Array<Ticket>> {
    return this.apiTicketListGroupReadResponse(id).pipe(
      __map(_r => _r.body as Array<Ticket>)
    );
  }

  /**
   * Ticket list received by the active user
   *
   * List of tickets for which the active user is a receiver
   * @return OK
   */
  apiTicketListListResponse(): __Observable<__StrictHttpResponse<Array<Ticket>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ticket-list/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Ticket>>;
      })
    );
  }
  /**
   * Ticket list received by the active user
   *
   * List of tickets for which the active user is a receiver
   * @return OK
   */
  apiTicketListList(): __Observable<Array<Ticket>> {
    return this.apiTicketListListResponse().pipe(
      __map(_r => _r.body as Array<Ticket>)
    );
  }

  /**
   * Ticket status update for Receiver
   *
   * Change of ticket status for receiver who can only put Pending or Resolved
   * @param params The `ApiService.ApiTicketReceiverUpdateUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   *
   * @return OK
   */
  apiTicketReceiverUpdateUpdateResponse(params: ApiService.ApiTicketReceiverUpdateUpdateParams): __Observable<__StrictHttpResponse<Ticket>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/ticket-receiver-update/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Ticket>;
      })
    );
  }
  /**
   * Ticket status update for Receiver
   *
   * Change of ticket status for receiver who can only put Pending or Resolved
   * @param params The `ApiService.ApiTicketReceiverUpdateUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   *
   * @return OK
   */
  apiTicketReceiverUpdateUpdate(params: ApiService.ApiTicketReceiverUpdateUpdateParams): __Observable<Ticket> {
    return this.apiTicketReceiverUpdateUpdateResponse(params).pipe(
      __map(_r => _r.body as Ticket)
    );
  }

  /**
   * List of ticket receivers
   *
   * List of ticket receivers
   * @param id undefined
   * @return OK
   */
  apiTicketReceiversListReadResponse(id: string): __Observable<__StrictHttpResponse<Array<ApiUser>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/ticket-receivers-list/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ApiUser>>;
      })
    );
  }
  /**
   * List of ticket receivers
   *
   * List of ticket receivers
   * @param id undefined
   * @return OK
   */
  apiTicketReceiversListRead(id: string): __Observable<Array<ApiUser>> {
    return this.apiTicketReceiversListReadResponse(id).pipe(
      __map(_r => _r.body as Array<ApiUser>)
    );
  }

  /**
   * Ticket status update for is_staff user
   *
   * Change of ticket status for is_staff user who can put every state
   * @param params The `ApiService.ApiTicketStaffUpdateUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   *
   * @return OK
   */
  apiTicketStaffUpdateUpdateResponse(params: ApiService.ApiTicketStaffUpdateUpdateParams): __Observable<__StrictHttpResponse<Ticket>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/ticket-staff-update/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Ticket>;
      })
    );
  }
  /**
   * Ticket status update for is_staff user
   *
   * Change of ticket status for is_staff user who can put every state
   * @param params The `ApiService.ApiTicketStaffUpdateUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   *
   * @return OK
   */
  apiTicketStaffUpdateUpdate(params: ApiService.ApiTicketStaffUpdateUpdateParams): __Observable<Ticket> {
    return this.apiTicketStaffUpdateUpdateResponse(params).pipe(
      __map(_r => _r.body as Ticket)
    );
  }

  /**
   * Creation of a topic
   *
   * Creation of a new topic
   * @param data undefined
   * @return Created
   */
  apiTopicCreateCreateResponse(data: Topic): __Observable<__StrictHttpResponse<Topic>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/topic-create/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Topic>;
      })
    );
  }
  /**
   * Creation of a topic
   *
   * Creation of a new topic
   * @param data undefined
   * @return Created
   */
  apiTopicCreateCreate(data: Topic): __Observable<Topic> {
    return this.apiTopicCreateCreateResponse(data).pipe(
      __map(_r => _r.body as Topic)
    );
  }

  /**
   * Get topic Detail
   *
   * Retrieve all topic information
   * @param id undefined
   * @return OK
   */
  apiTopicDetailReadResponse(id: string): __Observable<__StrictHttpResponse<Topic>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/topic-detail/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Topic>;
      })
    );
  }
  /**
   * Get topic Detail
   *
   * Retrieve all topic information
   * @param id undefined
   * @return OK
   */
  apiTopicDetailRead(id: string): __Observable<Topic> {
    return this.apiTopicDetailReadResponse(id).pipe(
      __map(_r => _r.body as Topic)
    );
  }

  /**
   * List of topics of a group
   *
   * List of topics of a particular group
   * @param id undefined
   * @return OK
   */
  apiTopicGroupListReadResponse(id: string): __Observable<__StrictHttpResponse<Array<Topic>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/topic-group-list/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Topic>>;
      })
    );
  }
  /**
   * List of topics of a group
   *
   * List of topics of a particular group
   * @param id undefined
   * @return OK
   */
  apiTopicGroupListRead(id: string): __Observable<Array<Topic>> {
    return this.apiTopicGroupListReadResponse(id).pipe(
      __map(_r => _r.body as Array<Topic>)
    );
  }

  /**
   * List of topics is_staff user is not subscribed
   *
   * List of topics to which a staff user is not subscribed
   * @return OK
   */
  apiTopicNotStaffListListResponse(): __Observable<__StrictHttpResponse<Array<Topic>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/topic-not-staff-list/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Topic>>;
      })
    );
  }
  /**
   * List of topics is_staff user is not subscribed
   *
   * List of topics to which a staff user is not subscribed
   * @return OK
   */
  apiTopicNotStaffListList(): __Observable<Array<Topic>> {
    return this.apiTopicNotStaffListListResponse().pipe(
      __map(_r => _r.body as Array<Topic>)
    );
  }

  /**
   * Add user to Topic
   *
   * Subscribe user to selected topic
   * @param id undefined
   */
  apiTopicUserAddUpdateResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/topic-user-add/${encodeURIComponent(String(id))}`,
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
   * Add user to Topic
   *
   * Subscribe user to selected topic
   * @param id undefined
   */
  apiTopicUserAddUpdate(id: string): __Observable<null> {
    return this.apiTopicUserAddUpdateResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * List of topics of a group user is subscribed
   *
   * List of topics of a group to which the active user is subscribed
   * @param id undefined
   * @return OK
   */
  apiTopicUserGroupListReadResponse(id: string): __Observable<__StrictHttpResponse<Array<Topic>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/topic-user-group-list/${encodeURIComponent(String(id))}`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Topic>>;
      })
    );
  }
  /**
   * List of topics of a group user is subscribed
   *
   * List of topics of a group to which the active user is subscribed
   * @param id undefined
   * @return OK
   */
  apiTopicUserGroupListRead(id: string): __Observable<Array<Topic>> {
    return this.apiTopicUserGroupListReadResponse(id).pipe(
      __map(_r => _r.body as Array<Topic>)
    );
  }

  /**
   * List of all topics of the groups to which active user belongs
   *
   * List of all topics of the groups to which active user belongs
   * @return OK
   */
  apiTopicUserListListResponse(): __Observable<__StrictHttpResponse<Array<Topic>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/topic-user-list/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Topic>>;
      })
    );
  }
  /**
   * List of all topics of the groups to which active user belongs
   *
   * List of all topics of the groups to which active user belongs
   * @return OK
   */
  apiTopicUserListList(): __Observable<Array<Topic>> {
    return this.apiTopicUserListListResponse().pipe(
      __map(_r => _r.body as Array<Topic>)
    );
  }

  /**
   * List users subscribed to the topic
   *
   * List of users subscribed to the topic
   * @param id undefined
   * @return OK
   */
  apiTopicUsersReadResponse(id: string): __Observable<__StrictHttpResponse<Array<ApiUser>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/topic-users/${encodeURIComponent(String(id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<ApiUser>>;
      })
    );
  }
  /**
   * List users subscribed to the topic
   *
   * List of users subscribed to the topic
   * @param id undefined
   * @return OK
   */
  apiTopicUsersRead(id: string): __Observable<Array<ApiUser>> {
    return this.apiTopicUsersReadResponse(id).pipe(
      __map(_r => _r.body as Array<ApiUser>)
    );
  }
}

module ApiService {

  /**
   * Parameters for apiTicketCreatorUpdateUpdate
   */
  export interface ApiTicketCreatorUpdateUpdateParams {
    id: string;
    data: Ticket;
  }

  /**
   * Parameters for apiTicketReceiverUpdateUpdate
   */
  export interface ApiTicketReceiverUpdateUpdateParams {
    id: string;
    data: Ticket;
  }

  /**
   * Parameters for apiTicketStaffUpdateUpdate
   */
  export interface ApiTicketStaffUpdateUpdateParams {
    id: string;
    data: Ticket;
  }
}

export { ApiService }
