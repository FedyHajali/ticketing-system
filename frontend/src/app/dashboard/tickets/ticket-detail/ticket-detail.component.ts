import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  ticket: Ticket | undefined;
  panelOpenState = true;
  path: string[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shared: SharedService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.route.url.forEach((urlSegments) => {
      urlSegments.forEach((segment) => {
        this.path.push(segment.path);
      });
    });
    this.sub = this.route.params.subscribe((params) => {
      this.ticket_id = +params['ticket_id'];
    });

    this.getTicketDetail(this.ticket_id).subscribe((ticket) => {
      this.ticket = ticket;
    });
  }

  getTicketDetail(id: number) {
    return this.shared.getTicketDetail(id);
  }
}
