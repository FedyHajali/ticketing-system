import { Component, OnInit } from '@angular/core';
import { ApiService, AuthService } from 'src/app/api/services';
import { Topic, Group, User, Ticket } from '../../api/models';

@Component({
  selector: 'app-complete-count',
  templateUrl: './complete-count.component.html',
  styleUrls: ['./complete-count.component.scss']
})
export class CompleteCountComponent implements OnInit {

  total_completed: number =0;
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
            if(ticket.status=='CL')
            this.total_completed++
        });
      });
    
  }

}
