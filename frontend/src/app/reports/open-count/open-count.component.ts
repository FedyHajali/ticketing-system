import { Component, OnInit } from '@angular/core';
import { ApiService, AuthService } from 'src/app/api/services';
import { Topic, Group, User, Ticket } from '../../api/models';

@Component({
  selector: 'app-open-count',
  templateUrl: './open-count.component.html',
  styleUrls: ['./open-count.component.scss']
})
export class OpenCountComponent implements OnInit {

  total_open: number =0;
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
            if(ticket.status=='OP')
            this.total_open++
        });
      });
    
  }
}
