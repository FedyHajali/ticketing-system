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
  userSubject = new Subject<User>();
  user: User = new User();

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
    this.userSubject.next();
  }

  register(data: any) {
    return this.httpClient
      .post<any>(this.baseUrl + '/auth/registration/', data)
      .pipe(
        tap(
          (res) => {
            console.log(res);
            this.login(data);
          },
          (error) => {
            console.error(error);
          }
        )
      );
  }

  public get loggedIn(): boolean {
    return sessionStorage.getItem('token') !== null;
  }

  getUser() {
    return this.httpClient.get<User>(this.baseUrl + '/auth/user/').subscribe(
      (user) => {
        this.handleAuthentication(user);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getGroups() {
    return this.httpClient.get<any>(this.baseUrl + '/auth/groups/');
  }

  handleAuthentication(user: User) {
    sessionStorage.setItem('user', JSON.stringify(user));
    let newUser: User = {
      pk: user.pk,
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      groups: user.groups,
      is_staff: user.is_staff,
    };
    this.userSubject.next(newUser);
  }

  checkUser() {
    this.user = sessionStorage.getItem('user')
      ? JSON.parse(<string>sessionStorage.getItem('user'))
      : null;
    return this.user;
  }
}
