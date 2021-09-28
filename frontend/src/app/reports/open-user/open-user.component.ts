import { Component, OnInit } from '@angular/core';
import { ApiService, AuthService } from 'src/app/api/services';
import { Topic, Group, User, Ticket } from '../../api/models';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-open-user',
  templateUrl: './open-user.component.html',
  styleUrls: ['./open-user.component.scss']
})
export class OpenUserComponent implements OnInit {

  total_open: number =0;
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
            if(ticket.status=='OP')
            this.total_open++
        });
      });
    
  }

}
