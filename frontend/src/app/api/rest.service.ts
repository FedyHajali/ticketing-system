import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  token = '';

  // http options used for making API calls
  private httpOptions: any;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token ? this.token : '',
      }),
    };
  }
  baseUrl = 'http://localhost:8000';

  public login(user: any) {
    return this.http
      .post(
        this.baseUrl + '/auth/login/',
        JSON.stringify(user),
        this.httpOptions
      )
      .subscribe((data: any) => {
        console.log(data);
        this.token = data['key'];
      });
  }
}
