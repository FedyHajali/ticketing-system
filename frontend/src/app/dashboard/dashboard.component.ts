import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { SharedService } from '../services/shared.service';
import { ApiService, AuthService } from '../api/services';
import { Group, User, Ticket, Topic } from '../api/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private userSub!: Subscription;
  user: User | undefined;
  groups: Group[] = [];
  tickets: Ticket[] = [];
  topics: Topic[] = [];
  activeGroup!: Group;

  constructor(
    private api: ApiService,
    private shared: SharedService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.user = this.shared.getActiveUser();
    if (this.user) this.getGroupList();
    this.userSub = this.shared.userSubject.subscribe((user) => {
      this.user = this.shared.getActiveUser();
      console.log('Active User:', this.user?.username);
      if (this.user) this.getGroupList();
    });
  }

  getGroupList() {
    this.auth.authGroupsListUserList().subscribe((groups) => {
      this.groups = groups;
      this.activeGroup = this.groups[0];
      console.log('Active Group:', this.activeGroup.name);
      if (this.activeGroup.id) this.getTopicList(this.activeGroup.id);
    });
  }

  changeGroup(group: Group) {
    this.activeGroup = group;
    console.log('Active Group:', this.activeGroup.name);
    if (this.activeGroup.id) this.getTopicList(this.activeGroup.id);
  }

  getTicketList() {
    this.api.apiTicketsListList().subscribe((tickets: any) => {
      this.tickets = tickets;
    });
  }

  getTopicList(id: number) {
    this.api.apiTopicsListGroupRead(id.toString()).subscribe((topics: any) => {
      this.topics = topics;
    });
  }
}
