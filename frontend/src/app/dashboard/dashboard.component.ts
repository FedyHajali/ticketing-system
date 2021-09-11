import { Component, Input, OnInit } from '@angular/core';
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
  user: User = new User();
  tickets: Ticket[] = [];
  constructor(private rs: RestService, private auth: AuthService) {}

  ngOnInit(): void {
    this.user = this.auth.checkUser();
    this.userSub = this.auth.userSubject.subscribe((user) => {
      this.user = this.auth.checkUser();
    });
  }

  getTicketList() {
    this.rs.getTicketList().subscribe((response) => {
      this.tickets = response;
      console.log(this.tickets);
    });
  }
}
