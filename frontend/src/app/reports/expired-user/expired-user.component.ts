import { Component, OnInit } from '@angular/core';
import { ApiService, AuthService } from 'src/app/api/services';
import { Topic, Group, User, Ticket } from '../../api/models';
import { SharedService } from '../../services/shared.service';


@Component({
  selector: 'app-expired-user',
  templateUrl: './expired-user.component.html',
  styleUrls: ['./expired-user.component.scss']
})
export class ExpiredUserComponent implements OnInit {

  total_expired: number =0;
  isLoading = true;
  tickets: Ticket[] = [];
  user!: User;
  constructor(
    private api: ApiService,
    private shared: SharedService,
    private auth: AuthService) 
    { 
      this.shared.getActiveUser().subscribe((user) => {
        this.user = user;
        this.isLoading = false;
      });
    }

  ngOnInit(): void {
    this.getTicktes();
  }

  getTicktes() {
    this.api.apiTicketsListCreatorRead(this.user.id?.toString()!).subscribe(
      (tickets) => {
        this.tickets = tickets;
        this.tickets.forEach((ticket) =>{
            if(ticket.status=='EX')
            this.total_expired++
        });
      });
    
  }
}
