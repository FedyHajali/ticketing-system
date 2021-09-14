import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from '../api/services';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  userSubject = new Subject<User>();
  user: User = new User();

  constructor(private auth: AuthService) {}

  setUser() {
    this.auth.authUserDetailList().subscribe((response) => {
      console.log(response);
      this.handleAuthentication(response);
    });
  }

  handleAuthentication(user: any) {
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
    const user = sessionStorage.getItem('user')
      ? JSON.parse(<string>sessionStorage.getItem('user'))
      : null;
    return user;
  }
}
