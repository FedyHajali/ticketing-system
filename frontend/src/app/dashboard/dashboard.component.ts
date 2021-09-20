import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { SharedService } from '../services/shared.service';
import { ApiService, AuthService } from '../api/services';
import { Group, User } from '../api/models';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private userSub!: Subscription;
  user: User | undefined;
  groups: Group[] = [];

  constructor(
    private api: ApiService,
    private shared: SharedService,
    private auth: AuthService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.shared.getActiveUser();
    this.getGroupList();
    this.userSub = this.shared.userSubject.subscribe((user) => {
      this.user = this.shared.getActiveUser();
      this.getGroupList();
    });
  }

  getGroupList() {
    if (this.user)
      this.shared.getGroupList().subscribe((groups) => {
        this.groups = groups;
      });
  }

  navigateTopics(id: any) {
    this.router.navigate(['topics', id], { relativeTo: this.route });
  }
}
