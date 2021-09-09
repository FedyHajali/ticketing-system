import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { User } from './User';

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
          localStorage.setItem('token', response.key);
          this.getUser();
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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
    return localStorage.getItem('token') !== null;
  }

  getUser() {
    return this.httpClient
      .get<User>(this.baseUrl + '/auth/user/')
      .subscribe((user) => {
        this.handleAuthentication(user);
      });
  }

  handleAuthentication(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    const newUser = new User(
      user.id,
      user.lastname,
      user.email,
      user.firstname,
      user.lastname
    );
    this.user.next(newUser);
  }
}
