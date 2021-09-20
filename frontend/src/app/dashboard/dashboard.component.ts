import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { SharedService } from '../services/shared.service';
import { ApiService, AuthService } from '../api/services';
import { Group, Ticket, User } from '../api/models';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupCreateComponent } from './groups/group-create/group-create.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private userSub!: Subscription;
  user: User | undefined;
  userGroups: Group[] = [];
  allGroups: Group[] = [];
  allTickets: Ticket[] = [];

  constructor(
    private dialog: MatDialog,
    private shared: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.shared.getActiveUser();
    this.getUserGroupList();
    this.getAllGroupList();
    this.getAllTickets();
  }

  getUserGroupList() {
    this.shared.getUserGroupList().subscribe((groups) => {
      this.userGroups = groups;
    });
  }

  getAllGroupList() {
    this.shared.getAllGroupList().subscribe((groups) => {
      this.allGroups = groups;
    });
  }

  createGroup() {
    const dialogRef = this.dialog.open(GroupCreateComponent, {
      width: '300px',
      height: '300px',
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllGroupList();
    });
  }

  getAllTickets() {
    this.shared.getTicketListAll().subscribe((tickets) => {
      this.allTickets = tickets;
    });
  }
}
