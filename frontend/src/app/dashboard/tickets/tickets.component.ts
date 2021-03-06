import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group, Ticket, Topic } from 'src/app/api/models';
import { ApiService, AuthService } from 'src/app/api/services';
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
    private shared: SharedService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.shared.showSpinner()
    this.sub = this.route.params.subscribe((params) => {
      this.group_id = +params['group_id']; // (+) converts string 'id' to a number
      this.topic_id = +params['topic_id']; // (+) converts string 'id' to a number
    });
    this.getGroup();
    this.getTopic();
    this.getTicketListTopic(this.topic_id);
  }

  getGroup() {
    this.auth
      .authGroupsDetailRead(this.group_id.toString())
      .subscribe((group) => {
        this.group = group;
      });
  }

  getTopic() {
    this.api
      .apiTopicsDetailRead(this.topic_id.toString())
      .subscribe((topic) => {
        this.topic = topic;
      });
  }

  getTicketListTopic(topic_id: number) {
    this.api
      .apiTicketsListTopicUserRead(topic_id.toString())
      .subscribe((tickets) => {
        this.tickets = tickets;
      });
  }

  navigateTicket(ticket: Ticket) {
    this.router.navigate(['tickets/' + ticket.id], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
