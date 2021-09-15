import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Ticket } from '../api/models/ticket';
import { User } from '../api/models/user';
import { SharedService } from '../services/shared.service';
import { ApiService } from '../api/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private userSub!: Subscription;
  user: User | undefined;
  tickets: Ticket[] | null = [];
  constructor(private api: ApiService, private shared: SharedService) {}

  ngOnInit(): void {
    this.user = this.shared.checkUser();
    this.userSub = this.shared.userSubject.subscribe((user) => {
      this.user = this.shared.checkUser();
    });
  }

  getTicketList() {
    this.api.apiTicketListList().subscribe((response: any) => {
      this.tickets = response;
      console.log(this.tickets);
    });
  }
}
