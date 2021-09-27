import { Component, OnInit } from '@angular/core';
import { ApiService, AuthService } from 'src/app/api/services';
import { Topic, Group, User, Ticket } from '../../api/models';
@Component({
  selector: 'app-pending-count',
  templateUrl: './pending-count.component.html',
  styleUrls: ['./pending-count.component.scss']
})
export class PendingCountComponent implements OnInit {
  total_pending: number =0;
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
        this.tickets.forEach((ticket) =>{
            if(ticket.status=='PE'||ticket.status=='RE')
            this.total_pending++
        });
      });
    
  }

}
