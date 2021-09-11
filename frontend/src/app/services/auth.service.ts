import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:8000';
  user = new Subject<User>();

  constructor(private httpClient: HttpClient) {}

  login(data: { username: string; password: string }) {
    return this.httpClient
      .post<{ key: string }>(this.baseUrl + '/auth/login/', data)
      .pipe(
        map((response) => {
          sessionStorage.setItem('token', response.key);
          this.getUser();
        })
      );
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    this.user.next();
  }

  register(data: any) {
    return this.httpClient
      .post<any>(this.baseUrl + '/auth/registration/', data)
      .pipe(
        tap((res) => {
          console.log(res);
          // this.login(data);
        })
      );
  }

  public get loggedIn(): boolean {
    return sessionStorage.getItem('token') !== null;
  }

  getUser() {
    return this.httpClient
      .get<User>(this.baseUrl + '/auth/user/')
      .subscribe((user) => {
        this.handleAuthentication(user);
      });
  }

  getGroups() {
    return this.httpClient.get<any>(this.baseUrl + '/auth/groups/');
  }

  handleAuthentication(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
    let newUser: User = {
      id: user.id,
      username: user.username,
      password: null,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      groups: user.groups,
      is_staff: user.is_staff,
    };
    this.user.next(newUser);
  }
}
