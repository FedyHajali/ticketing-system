import { Component, OnInit } from '@angular/core';
import { ApiService, AuthService } from 'src/app/api/services';
import { Topic, Group, User, Ticket } from '../../api/models';
@Component({
  selector: 'app-ticket-count',
  templateUrl: './ticket-count.component.html',
  styleUrls: ['./ticket-count.component.scss']
})
export class TicketCountComponent implements OnInit {


  total_tickets: number=0;
  tickets: Ticket[] = [];
  constructor(
    private api: ApiService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.getTicktes();
  }

  getTicktes() {
    this.api.apiTicketsListAllList().subscribe(
      (tickets) => {
        this.tickets = tickets;
        this.total_tickets=tickets.length
      });
    
  }

}
