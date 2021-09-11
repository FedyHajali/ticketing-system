import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '../services/auth.service';
import { RestService } from '../services/rest.service';
import { Ticket } from '../models/Ticket';
import { User } from '../models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private userSub!: Subscription;
  user: User | undefined;
  tickets: Ticket[] = [];
  constructor(private rs: RestService, private auth: AuthService) {}

  ngOnInit(): void {
    this.checkUser();
    this.userSub = this.auth.user.subscribe((user) => {
      this.checkUser();
    });
  }

  getTicketListReceiver(username?: string) {
    this.rs.getTicketReceiverList(username).subscribe((response) => {
      this.tickets = response;
      console.log(this.tickets);
    });
  }

  checkUser() {
    this.user = sessionStorage.getItem('user')
      ? JSON.parse(<string>sessionStorage.getItem('user'))
      : null;
  }
}
