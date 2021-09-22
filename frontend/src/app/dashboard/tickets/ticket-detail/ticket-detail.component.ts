import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group, Topic } from 'src/app/api/models';
import { Ticket } from 'src/app/api/models/ticket';
import { ApiService } from 'src/app/api/services';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
})
export class TicketDetailComponent implements OnInit {
  ticket_id!: number;
  private sub: any;
  group!: Group;
  topic!: Topic;
  ticket!: Ticket;
  panelOpenState = true;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shared: SharedService,
    private api: ApiService
  ) {
    this.group = this.router.getCurrentNavigation()?.extras?.state?.group;
    this.topic = this.router.getCurrentNavigation()?.extras?.state?.topic;
    this.ticket = this.router.getCurrentNavigation()?.extras?.state?.ticket;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.ticket_id = +params['ticket_id'];
    });
    
    this.getTicketDetail(this.ticket_id)
  }

  getTicketDetail(ticket_id: number) {
    this.api.apiTicketsDetailRead(ticket_id.toString()).subscribe((ticket) => {
      this.ticket = ticket;
    });
  }
}
