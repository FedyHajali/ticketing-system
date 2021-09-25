import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ApiService, AuthService } from '../api/services';
import { Group, Ticket, Topic, User } from '../api/models';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  isLoggedIn = false;
  userSubject = new Subject<User>();
  user: User | undefined;
  groups: Group[] = [];
  redirectUrl: string | null = null;

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}

  setActiveUser() {
    this.isLoggedIn = true;
    this.auth.authUsersDetailList().subscribe((response) => {
      this.handleAuthentication(response);
    });
  }

  getActiveUser() {
    return JSON.parse(<string>sessionStorage.getItem('user'));
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

  showSpinner() {
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 2 seconds */
      this.spinner.hide();
    }, 2000);
  }

  showToastSuccess(title: string, message: string) {
    this.toastr.success(message, title);
  }
  showToastDanger(title: string, message: string) {
    this.toastr.error(message, title);
  }
  showToastWarning(title: string, message: string) {
    this.toastr.warning(message, title);
  }
}
