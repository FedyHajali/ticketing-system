import { Component, OnInit } from '@angular/core';
import { ApiService, AuthService } from 'src/app/api/services';
import { Topic, Group, User, Ticket } from '../../api/models';

@Component({
  selector: 'app-expired-count',
  templateUrl: './expired-count.component.html',
  styleUrls: ['./expired-count.component.scss']
})
export class ExpiredCountComponent implements OnInit {

  total_expired: number =0;
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
            if(ticket.status=='EX')
            this.total_expired++
        });
      });
    
  }

}
