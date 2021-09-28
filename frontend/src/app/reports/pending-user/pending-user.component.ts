import { Component, OnInit } from '@angular/core';
import { ApiService, AuthService } from 'src/app/api/services';
import { Topic, Group, User, Ticket } from '../../api/models';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-pending-user',
  templateUrl: './pending-user.component.html',
  styleUrls: ['./pending-user.component.scss']
})
export class PendingUserComponent implements OnInit {
  total_pending: number =0;
  tickets: Ticket[] = [];
  user!: User;
  constructor(
    private api: ApiService,
    private shared: SharedService,
    private auth: AuthService) 
    { 
      this.user = this.shared.getActiveUser();
    }

  ngOnInit(): void {
    this.getTicktes();
  }

  getTicktes() {
    this.api.apiTicketsListCreatorRead(this.user.id?.toString()!).subscribe(
      (tickets) => {
        this.tickets = tickets;
        this.tickets.forEach((ticket) =>{
            if(ticket.status=='PE' || ticket.status=='RE')
            this.total_pending++
        });
      });
    
  }
}
