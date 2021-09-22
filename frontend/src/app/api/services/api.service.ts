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
import { User } from '../models/user';
import { Topic } from '../models/topic';
@Injectable({
  providedIn: 'root',
})
class ApiService extends __BaseService {
  static readonly apiCommentsCreateCreatePath = '/api/comments/create/';
  static readonly apiCommentsDeleteDeletePath = '/api/comments/delete/{comment_id}';
  static readonly apiCommentsDetailReadPath = '/api/comments/detail/{comment_id}';
  static readonly apiCommentsTicketListReadPath = '/api/comments/ticket-list/{ticket_id}';
  static readonly apiTicketsCreateCreatePath = '/api/tickets/create/';
  static readonly apiTicketsDeleteDeletePath = '/api/tickets/delete/{ticket_id}/';
  static readonly apiTicketsDetailReadPath = '/api/tickets/detail/{ticket_id}/';
  static readonly apiTicketsListAllListPath = '/api/tickets/list-all/';
  static readonly apiTicketsListCreatorReadPath = '/api/tickets/list-creator/{creator_id}';
  static readonly apiTicketsListGroupsReadPath = '/api/tickets/list-groups/{group_id}';
  static readonly apiTicketsListTopicUserReadPath = '/api/tickets/list-topic-user/{topic_id}/';
  static readonly apiTicketsListTopicReadPath = '/api/tickets/list-topic/{topic_id}/';
  static readonly apiTicketsListListPath = '/api/tickets/list/';
  static readonly apiTicketsReceiversListReadPath = '/api/tickets/receivers-list/{ticket_id}';
  static readonly apiTicketsUpdateCreatorUpdatePath = '/api/tickets/update-creator/{ticket_id}/';
  static readonly apiTicketsUpdateReceiverUpdatePath = '/api/tickets/update-receiver/{ticket_id}/';
  static readonly apiTicketsUpdateStaffUpdatePath = '/api/tickets/update-staff/{ticket_id}/';
  static readonly apiTicketsUserAddUpdatePath = '/api/tickets/user-add/{ticket_id}/{user_id}';
  static readonly apiTopicsAddUserUpdatePath = '/api/topics/add-user/{topic_id}';
  static readonly apiTopicsCreateCreatePath = '/api/topics/create/';
  static readonly apiTopicsDeleteUserUpdatePath = '/api/topics/delete-user/{topic_id}';
  static readonly apiTopicsDeleteDeletePath = '/api/topics/delete/{topic_id}';
  static readonly apiTopicsDetailReadPath = '/api/topics/detail/{topic_id}';
  static readonly apiTopicsListGroupReadPath = '/api/topics/list-group/{group_id}';
  static readonly apiTopicsListNotStaffListPath = '/api/topics/list-not-staff/';
  static readonly apiTopicsListUserGroupReadPath = '/api/topics/list-user-group/{group_id}';
  static readonly apiTopicsListUserGroupsListPath = '/api/topics/list-user-groups/';
  static readonly apiTopicsUserListReadPath = '/api/topics/user-list/{topic_id}/';

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
  apiCommentsCreateCreateResponse(data: Comment): __Observable<__StrictHttpResponse<Comment>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/comments/create/`,
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
  apiCommentsCreateCreate(data: Comment): __Observable<Comment> {
    return this.apiCommentsCreateCreateResponse(data).pipe(
      __map(_r => _r.body as Comment)
    );
  }

  /**
   * Delete of a Comment
   *
   * Delete of a Comment
   * @param comment_id undefined
   */
  apiCommentsDeleteDeleteResponse(commentId: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/comments/delete/${encodeURIComponent(String(commentId))}`,
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
   * Delete of a Comment
   *
   * Delete of a Comment
   * @param comment_id undefined
   */
  apiCommentsDeleteDelete(commentId: string): __Observable<null> {
    return this.apiCommentsDeleteDeleteResponse(commentId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get comment info
   *
   * Retrieve all comment information
   * @param comment_id undefined
   * @return OK
   */
  apiCommentsDetailReadResponse(commentId: string): __Observable<__StrictHttpResponse<Comment>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/comments/detail/${encodeURIComponent(String(commentId))}`,
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
   * @param comment_id undefined
   * @return OK
   */
  apiCommentsDetailRead(commentId: string): __Observable<Comment> {
    return this.apiCommentsDetailReadResponse(commentId).pipe(
      __map(_r => _r.body as Comment)
    );
  }

  /**
   * List of Comments of a Ticket
   *
   * List of Comments of a particular Ticket
   * @param ticket_id undefined
   * @return OK
   */
  apiCommentsTicketListReadResponse(ticketId: string): __Observable<__StrictHttpResponse<Array<Comment>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/comments/ticket-list/${encodeURIComponent(String(ticketId))}`,
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
   * @param ticket_id undefined
   * @return OK
   */
  apiCommentsTicketListRead(ticketId: string): __Observable<Array<Comment>> {
    return this.apiCommentsTicketListReadResponse(ticketId).pipe(
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
  apiTicketsCreateCreateResponse(data: Ticket): __Observable<__StrictHttpResponse<Ticket>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/tickets/create/`,
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
  apiTicketsCreateCreate(data: Ticket): __Observable<Ticket> {
    return this.apiTicketsCreateCreateResponse(data).pipe(
      __map(_r => _r.body as Ticket)
    );
  }

  /**
   * Delete of a ticket
   *
   * Delete of a ticket
   * @param ticket_id undefined
   */
  apiTicketsDeleteDeleteResponse(ticketId: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/tickets/delete/${encodeURIComponent(String(ticketId))}/`,
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
   * @param ticket_id undefined
   */
  apiTicketsDeleteDelete(ticketId: string): __Observable<null> {
    return this.apiTicketsDeleteDeleteResponse(ticketId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Ticket detail
   *
   * Returns all information of a ticket
   * @param ticket_id undefined
   * @return OK
   */
  apiTicketsDetailReadResponse(ticketId: string): __Observable<__StrictHttpResponse<Ticket>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/tickets/detail/${encodeURIComponent(String(ticketId))}/`,
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
   * @param ticket_id undefined
   * @return OK
   */
  apiTicketsDetailRead(ticketId: string): __Observable<Ticket> {
    return this.apiTicketsDetailReadResponse(ticketId).pipe(
      __map(_r => _r.body as Ticket)
    );
  }

  /**
   * All Tickets list
   *
   * List of all tickets
   * @return OK
   */
  apiTicketsListAllListResponse(): __Observable<__StrictHttpResponse<Array<Ticket>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/tickets/list-all/`,
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
   * All Tickets list
   *
   * List of all tickets
   * @return OK
   */
  apiTicketsListAllList(): __Observable<Array<Ticket>> {
    return this.apiTicketsListAllListResponse().pipe(
      __map(_r => _r.body as Array<Ticket>)
    );
  }

  /**
   * Ticket list created by the active user
   *
   * List of tickets for which the active user is a creator
   * @param creator_id undefined
   * @return OK
   */
  apiTicketsListCreatorReadResponse(creatorId: string): __Observable<__StrictHttpResponse<Array<Ticket>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/tickets/list-creator/${encodeURIComponent(String(creatorId))}`,
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
   * @param creator_id undefined
   * @return OK
   */
  apiTicketsListCreatorRead(creatorId: string): __Observable<Array<Ticket>> {
    return this.apiTicketsListCreatorReadResponse(creatorId).pipe(
      __map(_r => _r.body as Array<Ticket>)
    );
  }

  /**
   * Ticket list for a specific group
   *
   * List of tickets for a specific group
   * @param group_id undefined
   * @return OK
   */
  apiTicketsListGroupsReadResponse(groupId: string): __Observable<__StrictHttpResponse<Array<Ticket>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/tickets/list-groups/${encodeURIComponent(String(groupId))}`,
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
   * @param group_id undefined
   * @return OK
   */
  apiTicketsListGroupsRead(groupId: string): __Observable<Array<Ticket>> {
    return this.apiTicketsListGroupsReadResponse(groupId).pipe(
      __map(_r => _r.body as Array<Ticket>)
    );
  }

  /**
   * List of tickets of the topic to which the user is subscribed
   *
   * List of tickets of the topic to which the user is subscribed
   * @param topic_id undefined
   * @return OK
   */
  apiTicketsListTopicUserReadResponse(topicId: string): __Observable<__StrictHttpResponse<Array<Ticket>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/tickets/list-topic-user/${encodeURIComponent(String(topicId))}/`,
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
   * List of tickets of the topic to which the user is subscribed
   *
   * List of tickets of the topic to which the user is subscribed
   * @param topic_id undefined
   * @return OK
   */
  apiTicketsListTopicUserRead(topicId: string): __Observable<Array<Ticket>> {
    return this.apiTicketsListTopicUserReadResponse(topicId).pipe(
      __map(_r => _r.body as Array<Ticket>)
    );
  }

  /**
   * Ticket list for a specific topic
   *
   * List of tickets for a specific topic
   * @param topic_id undefined
   * @return OK
   */
  apiTicketsListTopicReadResponse(topicId: string): __Observable<__StrictHttpResponse<Array<Ticket>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/tickets/list-topic/${encodeURIComponent(String(topicId))}/`,
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
   * Ticket list for a specific topic
   *
   * List of tickets for a specific topic
   * @param topic_id undefined
   * @return OK
   */
  apiTicketsListTopicRead(topicId: string): __Observable<Array<Ticket>> {
    return this.apiTicketsListTopicReadResponse(topicId).pipe(
      __map(_r => _r.body as Array<Ticket>)
    );
  }

  /**
   * Ticket list received by the active user
   *
   * List of tickets for which the active user is a receiver
   * @return OK
   */
  apiTicketsListListResponse(): __Observable<__StrictHttpResponse<Array<Ticket>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/tickets/list/`,
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
  apiTicketsListList(): __Observable<Array<Ticket>> {
    return this.apiTicketsListListResponse().pipe(
      __map(_r => _r.body as Array<Ticket>)
    );
  }

  /**
   * List of ticket receivers
   *
   * List of ticket receivers
   * @param ticket_id undefined
   * @return OK
   */
  apiTicketsReceiversListReadResponse(ticketId: string): __Observable<__StrictHttpResponse<Array<User>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/tickets/receivers-list/${encodeURIComponent(String(ticketId))}`,
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
   * List of ticket receivers
   *
   * List of ticket receivers
   * @param ticket_id undefined
   * @return OK
   */
  apiTicketsReceiversListRead(ticketId: string): __Observable<Array<User>> {
    return this.apiTicketsReceiversListReadResponse(ticketId).pipe(
      __map(_r => _r.body as Array<User>)
    );
  }

  /**
   * Ticket status update for Creator
   *
   * Change of ticket status for creator who can only put Closed or Open
   * @param params The `ApiService.ApiTicketsUpdateCreatorUpdateParams` containing the following parameters:
   *
   * - `ticket_id`:
   *
   * - `data`:
   *
   * @return OK
   */
  apiTicketsUpdateCreatorUpdateResponse(params: ApiService.ApiTicketsUpdateCreatorUpdateParams): __Observable<__StrictHttpResponse<Ticket>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/tickets/update-creator/${encodeURIComponent(String(params.ticketId))}/`,
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
   * @param params The `ApiService.ApiTicketsUpdateCreatorUpdateParams` containing the following parameters:
   *
   * - `ticket_id`:
   *
   * - `data`:
   *
   * @return OK
   */
  apiTicketsUpdateCreatorUpdate(params: ApiService.ApiTicketsUpdateCreatorUpdateParams): __Observable<Ticket> {
    return this.apiTicketsUpdateCreatorUpdateResponse(params).pipe(
      __map(_r => _r.body as Ticket)
    );
  }

  /**
   * Ticket status update for Receiver
   *
   * Change of ticket status for receiver who can only put Pending or Resolved
   * @param params The `ApiService.ApiTicketsUpdateReceiverUpdateParams` containing the following parameters:
   *
   * - `ticket_id`:
   *
   * - `data`:
   *
   * @return OK
   */
  apiTicketsUpdateReceiverUpdateResponse(params: ApiService.ApiTicketsUpdateReceiverUpdateParams): __Observable<__StrictHttpResponse<Ticket>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/tickets/update-receiver/${encodeURIComponent(String(params.ticketId))}/`,
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
   * @param params The `ApiService.ApiTicketsUpdateReceiverUpdateParams` containing the following parameters:
   *
   * - `ticket_id`:
   *
   * - `data`:
   *
   * @return OK
   */
  apiTicketsUpdateReceiverUpdate(params: ApiService.ApiTicketsUpdateReceiverUpdateParams): __Observable<Ticket> {
    return this.apiTicketsUpdateReceiverUpdateResponse(params).pipe(
      __map(_r => _r.body as Ticket)
    );
  }

  /**
   * Ticket status update for is_staff user
   *
   * Change of ticket status for is_staff user who can put every state
   * @param params The `ApiService.ApiTicketsUpdateStaffUpdateParams` containing the following parameters:
   *
   * - `ticket_id`:
   *
   * - `data`:
   *
   * @return OK
   */
  apiTicketsUpdateStaffUpdateResponse(params: ApiService.ApiTicketsUpdateStaffUpdateParams): __Observable<__StrictHttpResponse<Ticket>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/tickets/update-staff/${encodeURIComponent(String(params.ticketId))}/`,
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
   * @param params The `ApiService.ApiTicketsUpdateStaffUpdateParams` containing the following parameters:
   *
   * - `ticket_id`:
   *
   * - `data`:
   *
   * @return OK
   */
  apiTicketsUpdateStaffUpdate(params: ApiService.ApiTicketsUpdateStaffUpdateParams): __Observable<Ticket> {
    return this.apiTicketsUpdateStaffUpdateResponse(params).pipe(
      __map(_r => _r.body as Ticket)
    );
  }

  /**
   * Add user to Ticket
   *
   * Subscribe user to selected ticket
   * @param params The `ApiService.ApiTicketsUserAddUpdateParams` containing the following parameters:
   *
   * - `user_id`:
   *
   * - `ticket_id`:
   */
  apiTicketsUserAddUpdateResponse(params: ApiService.ApiTicketsUserAddUpdateParams): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;


    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/tickets/user-add/${encodeURIComponent(String(params.ticketId))}/${encodeURIComponent(String(params.userId))}`,
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
   * Add user to Ticket
   *
   * Subscribe user to selected ticket
   * @param params The `ApiService.ApiTicketsUserAddUpdateParams` containing the following parameters:
   *
   * - `user_id`:
   *
   * - `ticket_id`:
   */
  apiTicketsUserAddUpdate(params: ApiService.ApiTicketsUserAddUpdateParams): __Observable<null> {
    return this.apiTicketsUserAddUpdateResponse(params).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Add user to Topic
   *
   * Subscribe user to selected topic
   * @param topic_id undefined
   */
  apiTopicsAddUserUpdateResponse(topicId: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/topics/add-user/${encodeURIComponent(String(topicId))}`,
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
   * @param topic_id undefined
   */
  apiTopicsAddUserUpdate(topicId: string): __Observable<null> {
    return this.apiTopicsAddUserUpdateResponse(topicId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Creation of a topic
   *
   * Creation of a new topic
   * @param data undefined
   * @return Created
   */
  apiTopicsCreateCreateResponse(data: Topic): __Observable<__StrictHttpResponse<Topic>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/api/topics/create/`,
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
  apiTopicsCreateCreate(data: Topic): __Observable<Topic> {
    return this.apiTopicsCreateCreateResponse(data).pipe(
      __map(_r => _r.body as Topic)
    );
  }

  /**
   * Remove user from Topic
   *
   * Unsubscribe user from selected topic
   * @param topic_id undefined
   */
  apiTopicsDeleteUserUpdateResponse(topicId: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/topics/delete-user/${encodeURIComponent(String(topicId))}`,
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
   * Remove user from Topic
   *
   * Unsubscribe user from selected topic
   * @param topic_id undefined
   */
  apiTopicsDeleteUserUpdate(topicId: string): __Observable<null> {
    return this.apiTopicsDeleteUserUpdateResponse(topicId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Delete of a topic
   *
   * Delete of a topic
   * @param topic_id undefined
   */
  apiTopicsDeleteDeleteResponse(topicId: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'DELETE',
      this.rootUrl + `/api/topics/delete/${encodeURIComponent(String(topicId))}`,
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
   * Delete of a topic
   *
   * Delete of a topic
   * @param topic_id undefined
   */
  apiTopicsDeleteDelete(topicId: string): __Observable<null> {
    return this.apiTopicsDeleteDeleteResponse(topicId).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get topic Detail
   *
   * Retrieve all topic information
   * @param topic_id undefined
   * @return OK
   */
  apiTopicsDetailReadResponse(topicId: string): __Observable<__StrictHttpResponse<Topic>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/topics/detail/${encodeURIComponent(String(topicId))}`,
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
   * @param topic_id undefined
   * @return OK
   */
  apiTopicsDetailRead(topicId: string): __Observable<Topic> {
    return this.apiTopicsDetailReadResponse(topicId).pipe(
      __map(_r => _r.body as Topic)
    );
  }

  /**
   * List of topics of a group
   *
   * List of topics of a particular group
   * @param group_id undefined
   * @return OK
   */
  apiTopicsListGroupReadResponse(groupId: string): __Observable<__StrictHttpResponse<Array<Topic>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/topics/list-group/${encodeURIComponent(String(groupId))}`,
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
   * @param group_id undefined
   * @return OK
   */
  apiTopicsListGroupRead(groupId: string): __Observable<Array<Topic>> {
    return this.apiTopicsListGroupReadResponse(groupId).pipe(
      __map(_r => _r.body as Array<Topic>)
    );
  }

  /**
   * List of topics is_staff user is not subscribed
   *
   * List of topics to which a staff user is not subscribed
   * @return OK
   */
  apiTopicsListNotStaffListResponse(): __Observable<__StrictHttpResponse<Array<Topic>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/topics/list-not-staff/`,
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
  apiTopicsListNotStaffList(): __Observable<Array<Topic>> {
    return this.apiTopicsListNotStaffListResponse().pipe(
      __map(_r => _r.body as Array<Topic>)
    );
  }

  /**
   * List of topics of a group user is subscribed
   *
   * List of topics of a group to which the active user is subscribed
   * @param group_id undefined
   * @return OK
   */
  apiTopicsListUserGroupReadResponse(groupId: string): __Observable<__StrictHttpResponse<Array<Topic>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/topics/list-user-group/${encodeURIComponent(String(groupId))}`,
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
   * @param group_id undefined
   * @return OK
   */
  apiTopicsListUserGroupRead(groupId: string): __Observable<Array<Topic>> {
    return this.apiTopicsListUserGroupReadResponse(groupId).pipe(
      __map(_r => _r.body as Array<Topic>)
    );
  }

  /**
   * List of all topics of all groups to which active user belongs
   *
   * List of all topics of all groups to which active user belongs
   * @return OK
   */
  apiTopicsListUserGroupsListResponse(): __Observable<__StrictHttpResponse<Array<Topic>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/topics/list-user-groups/`,
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
   * List of all topics of all groups to which active user belongs
   *
   * List of all topics of all groups to which active user belongs
   * @return OK
   */
  apiTopicsListUserGroupsList(): __Observable<Array<Topic>> {
    return this.apiTopicsListUserGroupsListResponse().pipe(
      __map(_r => _r.body as Array<Topic>)
    );
  }

  /**
   * List users subscribed to the topic
   *
   * List of users subscribed to the topic
   * @param topic_id undefined
   * @return OK
   */
  apiTopicsUserListReadResponse(topicId: string): __Observable<__StrictHttpResponse<Array<User>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/topics/user-list/${encodeURIComponent(String(topicId))}/`,
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
   * List users subscribed to the topic
   *
   * List of users subscribed to the topic
   * @param topic_id undefined
   * @return OK
   */
  apiTopicsUserListRead(topicId: string): __Observable<Array<User>> {
    return this.apiTopicsUserListReadResponse(topicId).pipe(
      __map(_r => _r.body as Array<User>)
    );
  }
}

module ApiService {

  /**
   * Parameters for apiTicketsUpdateCreatorUpdate
   */
  export interface ApiTicketsUpdateCreatorUpdateParams {
    ticketId: string;
    data: Ticket;
  }

  /**
   * Parameters for apiTicketsUpdateReceiverUpdate
   */
  export interface ApiTicketsUpdateReceiverUpdateParams {
    ticketId: string;
    data: Ticket;
  }

  /**
   * Parameters for apiTicketsUpdateStaffUpdate
   */
  export interface ApiTicketsUpdateStaffUpdateParams {
    ticketId: string;
    data: Ticket;
  }

  /**
   * Parameters for apiTicketsUserAddUpdate
   */
  export interface ApiTicketsUserAddUpdateParams {
    userId: string;
    ticketId: string;
  }
}

export { ApiService }
