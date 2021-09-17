import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from '../api/services';
import { User } from '../api/models';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  isLoggedIn = false;
  userSubject = new Subject<User>();
  user: User | undefined;
  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  constructor(private auth: AuthService) {}

  setActiveUser() {
    this.isLoggedIn = true;
    this.auth.authUsersDetailList().subscribe((response) => {
      this.handleAuthentication(response);
    });
  }

  getActiveUser() {
    const user = sessionStorage.getItem('user')
      ? JSON.parse(<string>sessionStorage.getItem('user'))
      : null;
    return user;
  }

  handleAuthentication(user: any) {
    sessionStorage.setItem('user', JSON.stringify(user));
    let newUser: User = {
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      groups: user.groups,
      is_staff: user.is_staff,
    };
    this.userSubject.next(newUser);
  }

  isAuthenticated() {
    this.isLoggedIn = sessionStorage.getItem('user') == null ? false : true;
    return this.isLoggedIn;
  }
}
