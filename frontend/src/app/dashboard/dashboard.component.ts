import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { SharedService } from '../services/shared.service';
import { Group, Ticket, User } from '../api/models';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupCreateComponent } from './groups/group-create/group-create.component';
import { GroupSubscribeComponent } from './groups/group-subscribe/group-subscribe.component';
import { ApiService, AuthService } from '../api/services';
import { GroupDeleteComponent } from './groups/group-delete/group-delete.component';

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
  ticketsReceiver: Ticket[] = [];
  allTickets: Ticket[] = [];
  creatorTickets: Ticket[] = [];

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
    this.shared.showSpinner();
    this.getUserGroupList();
    this.getTickets();
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

  getTickets() {
    this.api.apiTicketsListReceiverList().subscribe((tickets) => {
      this.ticketsReceiver = tickets;
    });
    if (this.user?.id) {
      this.api
        .apiTicketsListCreatorRead(this.user.id.toString())
        .subscribe((tickets) => {
          this.creatorTickets = tickets;
        });
    }
    this.api.apiTicketsListAllList().subscribe((tickets) => {
      this.allTickets = tickets;
    });
  }

  navigateGroup(group: Group) {
    this.router.navigate(['groups/' + group.id], {
      relativeTo: this.route,
    });
  }

  createGroupModal() {
    const dialogRef = this.dialog.open(GroupCreateComponent, {
      width: '300px',
      height: 'auto',
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllGroupList();
    });
  }

  subscribeGroupModal(sub: boolean, group: Group) {
    const dialogRef = this.dialog.open(GroupSubscribeComponent, {
      width: '300px',
      height: 'auto',
      autoFocus: true,
      data: { sub: sub, group: group },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getUserGroupList();
    });
  }

  deleteGroupModal(group: Group) {
    const dialogRef = this.dialog.open(GroupDeleteComponent, {
      width: '350px',
      height: 'auto',
      autoFocus: true,
      data: { group: group },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getUserGroupList();
    });
  }
}
