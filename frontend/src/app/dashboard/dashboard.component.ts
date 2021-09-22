import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { SharedService } from '../services/shared.service';
import { Group, Ticket, User } from '../api/models';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupCreateComponent } from './groups/group-create/group-create.component';
import { GroupSubscribeComponent } from './groups/group-subscribe/group-subscribe.component';
import { ApiService, AuthService } from '../api/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private userSub!: Subscription;
  user!: User;
  userGroups: Group[] = [];
  allGroups: Group[] = [];
  allTickets: Ticket[] = [];

  constructor(
    private dialog: MatDialog,
    private shared: SharedService,
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = this.shared.getActiveUser();
  }

  ngOnInit(): void {
    this.getUserGroupList();
    this.getAllTickets();
  }

  getUserGroupList() {
    this.auth.authGroupsListUserList().subscribe((groups) => {
      this.userGroups = groups;
      this.getAllGroupList();
    });
  }

  getAllGroupList() {
    this.auth.authGroupsListList().subscribe((groups) => {
      this.allGroups = groups;
      // Remove userGroups from allGroups
      for (let i = 0; i < this.userGroups.length; i++) {
        for (let j = 0; j < this.allGroups.length; j++) {
          if (this.allGroups[j].id === this.userGroups[i].id) {
            this.allGroups.splice(j, 1);
            j -= 1;
          }
        }
      }
    });
  }

  getAllTickets() {
    this.api.apiTicketsListList().subscribe((tickets) => {
      this.allTickets = tickets;
    });
  }

  navigateGroup(group: Group) {
    this.router.navigate(['groups/' + group.id], {
      state: { group: group },
      relativeTo: this.route,
    });
  }

  createGroupModal() {
    const dialogRef = this.dialog.open(GroupCreateComponent, {
      width: '300px',
      height: '300px',
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllGroupList();
    });
  }

  subscribeGroupModal(sub: boolean, group: Group) {
    const dialogRef = this.dialog.open(GroupSubscribeComponent, {
      width: '350px',
      height: '250px',
      autoFocus: true,
      data: { sub: sub, group: group },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getUserGroupList();
    });
  }
}
