import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://127.0.0.1:8000';

  getTickets() {
    return this.http.get<any>(this.baseUrl + '/tickets/ticket-list');
  }

  postTicket(data: any) {
    return this.http.post(this.baseUrl + '/tickets', data);
  }

  register2(data: any) {
    return this.http.post(this.baseUrl + '/auth/register', data).toPromise();
  }

  register(data: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http
      .post<any>(this.baseUrl + '/auth/register/', data, httpOptions)
      .pipe(
        catchError((error) => {
          console.log('Caught in CatchError. Throwing error', error);
          return throwError(error);
        })
      );
  }
}
1;
