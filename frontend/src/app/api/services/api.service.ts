/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Ticket } from '../models/ticket';
@Injectable({
  providedIn: 'root',
})
class ApiService extends __BaseService {
  static readonly apiCommentCreateCreatePath = '/api/comment-create/';
  static readonly apiCommentDetailReadPath = '/api/comment-detail/{id}';
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
  static readonly apiTopicUserGroupListListPath = '/api/topic-user-group-list/';
  static readonly apiTopicUserListListPath = '/api/topic-user-list/';
  static readonly apiTopicUserReadPath = '/api/topic-user/{id}';
  static readonly apiTopicUsersReadPath = '/api/topic-users/{id}/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  apiCommentCreateCreateResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
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
        return _r as __StrictHttpResponse<null>;
      })
    );
  }  apiCommentCreateCreate(): __Observable<null> {
    return this.apiCommentCreateCreateResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  apiCommentDetailReadResponse(id: string): __Observable<__StrictHttpResponse<null>> {
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
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id undefined
   */
  apiCommentDetailRead(id: string): __Observable<null> {
    return this.apiCommentDetailReadResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Ticket Creation
   *
   * Creation of a new Ticket
   * @param data undefined
   * @return OK
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
   * @return OK
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
   * @param id undefined
   */
  apiTicketCreatorUpdateUpdateResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/ticket-creator-update/${encodeURIComponent(String(id))}/`,
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
   * Ticket status update for Creator
   *
   * Change of ticket status for creator who can only put Closed or Open
   * @param id undefined
   */
  apiTicketCreatorUpdateUpdate(id: string): __Observable<null> {
    return this.apiTicketCreatorUpdateUpdateResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
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
   */
  apiTicketDetailReadResponse(id: string): __Observable<__StrictHttpResponse<null>> {
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
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Ticket detail
   *
   * Returns all information of a ticket
   * @param id undefined
   */
  apiTicketDetailRead(id: string): __Observable<null> {
    return this.apiTicketDetailReadResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Ticket list created by the active user
   *
   * List of tickets for which the active user is a creator
   * @param id undefined
   */
  apiTicketListCreatorReadResponse(id: string): __Observable<__StrictHttpResponse<null>> {
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
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Ticket list created by the active user
   *
   * List of tickets for which the active user is a creator
   * @param id undefined
   */
  apiTicketListCreatorRead(id: string): __Observable<null> {
    return this.apiTicketListCreatorReadResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Ticket list for a specific group
   *
   * List of tickets for a specific group
   * @param id undefined
   */
  apiTicketListGroupReadResponse(id: string): __Observable<__StrictHttpResponse<null>> {
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
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * Ticket list for a specific group
   *
   * List of tickets for a specific group
   * @param id undefined
   */
  apiTicketListGroupRead(id: string): __Observable<null> {
    return this.apiTicketListGroupReadResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Ticket list received by the active user
   *
   * List of tickets for which the active user is a receiver
   * @return OK
   */
  apiTicketListListResponse(): __Observable<__StrictHttpResponse<Ticket>> {
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
        return _r as __StrictHttpResponse<Ticket>;
      })
    );
  }
  /**
   * Ticket list received by the active user
   *
   * List of tickets for which the active user is a receiver
   * @return OK
   */
  apiTicketListList(): __Observable<Ticket> {
    return this.apiTicketListListResponse().pipe(
      __map(_r => _r.body as Ticket)
    );
  }

  /**
   * @param id undefined
   */
  apiTicketReceiverUpdateUpdateResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/ticket-receiver-update/${encodeURIComponent(String(id))}/`,
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
   * @param id undefined
   */
  apiTicketReceiverUpdateUpdate(id: string): __Observable<null> {
    return this.apiTicketReceiverUpdateUpdateResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * List of ticket receivers
   *
   * List of ticket receivers
   * @param id undefined
   */
  apiTicketReceiversListReadResponse(id: string): __Observable<__StrictHttpResponse<null>> {
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
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * List of ticket receivers
   *
   * List of ticket receivers
   * @param id undefined
   */
  apiTicketReceiversListRead(id: string): __Observable<null> {
    return this.apiTicketReceiversListReadResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  apiTicketStaffUpdateUpdateResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/api/ticket-staff-update/${encodeURIComponent(String(id))}/`,
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
   * @param id undefined
   */
  apiTicketStaffUpdateUpdate(id: string): __Observable<null> {
    return this.apiTicketStaffUpdateUpdateResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
  apiTopicCreateCreateResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
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
        return _r as __StrictHttpResponse<null>;
      })
    );
  }  apiTopicCreateCreate(): __Observable<null> {
    return this.apiTopicCreateCreateResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  apiTopicDetailReadResponse(id: string): __Observable<__StrictHttpResponse<null>> {
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
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id undefined
   */
  apiTopicDetailRead(id: string): __Observable<null> {
    return this.apiTopicDetailReadResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  apiTopicGroupListReadResponse(id: string): __Observable<__StrictHttpResponse<null>> {
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
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id undefined
   */
  apiTopicGroupListRead(id: string): __Observable<null> {
    return this.apiTopicGroupListReadResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
  apiTopicNotStaffListListResponse(): __Observable<__StrictHttpResponse<null>> {
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
        return _r as __StrictHttpResponse<null>;
      })
    );
  }  apiTopicNotStaffListList(): __Observable<null> {
    return this.apiTopicNotStaffListListResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
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
   * @param id undefined
   */
  apiTopicUserAddUpdate(id: string): __Observable<null> {
    return this.apiTopicUserAddUpdateResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
  apiTopicUserGroupListListResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/topic-user-group-list/`,
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
  }  apiTopicUserGroupListList(): __Observable<null> {
    return this.apiTopicUserGroupListListResponse().pipe(
      __map(_r => _r.body as null)
    );
  }
  apiTopicUserListListResponse(): __Observable<__StrictHttpResponse<null>> {
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
        return _r as __StrictHttpResponse<null>;
      })
    );
  }  apiTopicUserListList(): __Observable<null> {
    return this.apiTopicUserListListResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  apiTopicUserReadResponse(id: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/api/topic-user/${encodeURIComponent(String(id))}`,
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
   * @param id undefined
   */
  apiTopicUserRead(id: string): __Observable<null> {
    return this.apiTopicUserReadResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param id undefined
   */
  apiTopicUsersReadResponse(id: string): __Observable<__StrictHttpResponse<null>> {
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
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param id undefined
   */
  apiTopicUsersRead(id: string): __Observable<null> {
    return this.apiTopicUsersReadResponse(id).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module ApiService {
}

export { ApiService }
