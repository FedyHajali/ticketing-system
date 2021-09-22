import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group, Ticket, Topic } from 'src/app/api/models';
import { ApiService } from 'src/app/api/services';
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
  group!: Group;
  topic!: Topic;
  tickets!: Ticket[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private shared: SharedService,
    private api: ApiService
  ) {
    this.group = this.router.getCurrentNavigation()?.extras?.state?.group;
    this.topic = this.router.getCurrentNavigation()?.extras?.state?.topic;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe((params) => {
      this.group_id = +params['group_id']; // (+) converts string 'id' to a number
      this.topic_id = +params['topic_id']; // (+) converts string 'id' to a number
    });
    this.getTicketListTopic(this.topic_id);
  }

  getTicketListTopic(topic_id: number) {
    this.api.apiTicketsListTopicUserRead(topic_id.toString()).subscribe((tickets) => {
      this.tickets = tickets;
    });
  }

  navigateTicket(ticket: Ticket) {
    this.router.navigate(['tickets/' + ticket.id], {
      state: { group: this.group, topic: this.topic, ticket: ticket },
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
