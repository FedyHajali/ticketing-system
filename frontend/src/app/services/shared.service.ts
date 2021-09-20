import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ApiService, AuthService } from '../api/services';
import { Group, Ticket, Topic, User } from '../api/models';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  isLoggedIn = false;
  userSubject = new Subject<User>();
  user: User | undefined;
  groups: Group[] = [];
  redirectUrl: string | null = null;

  constructor(private auth: AuthService, private api: ApiService) {}

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

  getUserGroupList() {
    var subjectGroups = new Subject<Group[]>();
    this.auth.authGroupsListUserList().subscribe((groups) => {
      subjectGroups.next(groups);
    });
    return subjectGroups.asObservable();
  }

  getAllGroupList() {
    var subjectGroups = new Subject<Group[]>();
    this.auth.authGroupsListList().subscribe((groups) => {
      subjectGroups.next(groups);
    });
    return subjectGroups.asObservable();
  }

  getTopicList(id: number) {
    var subjectTopics = new Subject<Topic[]>();
    this.api.apiTopicsListGroupRead(id.toString()).subscribe((topics) => {
      subjectTopics.next(topics);
    });
    return subjectTopics.asObservable();
  }

  getTicketListAll() {
    var subjectTickets = new Subject<Ticket[]>();
    this.api.apiTicketsListList().subscribe((tickets) => {
      subjectTickets.next(tickets);
    });
    return subjectTickets.asObservable();
  }

  getTicketListGroup(id: number) {
    var subjectTickets = new Subject<Ticket[]>();
    this.api.apiTicketsListGroupsRead(id.toString()).subscribe((tickets) => {
      subjectTickets.next(tickets);
    });
    return subjectTickets.asObservable();
  }

  getTicketDetail(id: number) {
    var subjectTicket = new Subject<Ticket>();
    this.api.apiTicketsDetailRead(id.toString()).subscribe((ticket) => {
      subjectTicket.next(ticket);
    });
    return subjectTicket.asObservable();
  }
}
