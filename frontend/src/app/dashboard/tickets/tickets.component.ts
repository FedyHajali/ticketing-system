import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/api/models';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss'],
})
export class TicketsComponent implements OnInit {
  group_id!: number;
  topic_id!: number;
  private sub: any;
  tickets!: Ticket[];

  constructor(private route: ActivatedRoute, private shared: SharedService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.group_id = +params['group_id']; // (+) converts string 'id' to a number
      this.topic_id = +params['topic_id']; // (+) converts string 'id' to a number
    });

    this.getTicketList(this.group_id);
  }

  getTicketList(id: number) {
    this.shared.getTicketListGroup(id).subscribe((tickets) => {
      this.tickets = tickets;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
