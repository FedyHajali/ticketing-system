import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Group, Ticket, Topic, User } from 'src/app/api/models';
import { ApiService, AuthService } from 'src/app/api/services';
import { SharedService } from 'src/app/services/shared.service';
import { TopicCreateComponent } from './topic-create/topic-create.component';
import { TopicDeleteComponent } from './topic-delete/topic-delete.component';
import { TopicSubscribeComponent } from './topic-subscribe/topic-subscribe.component';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  group_id!: number;
  private sub: any;
  user!: User;
  group!: Group;
  tickets: Ticket[] = [];
  userTopics: Topic[] = [];
  allTopics: Topic[] = [];
  constructor(
    private shared: SharedService,
    private dialog: MatDialog,
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user = this.shared.getActiveUser();
  }

  ngOnInit(): void {
    this.shared.showSpinner();
    this.sub = this.route.params.subscribe((params) => {
      this.group_id = +params['group_id']; // (+) converts string 'id' to a number
      this.getGroup();
      this.getUserTopicList();
      if (this.user.is_staff) this.getGroupTickets();
    });
  }

  getGroup() {
    this.auth
      .authGroupsDetailRead(this.group_id.toString())
      .subscribe((group) => {
        this.group = group;
      });
  }

  getUserTopicList() {
    this.api
      .apiTopicsListUserGroupRead(this.group_id.toString())
      .subscribe((topics) => {
        this.userTopics = topics;
        this.getAllTopicList();
      });
  }

  getAllTopicList() {
    this.api
      .apiTopicsListGroupRead(this.group_id.toString())
      .subscribe((topics) => {
        this.allTopics = topics;
        // Remove userTopics from allTopics
        for (let i = 0; i < this.userTopics.length; i++) {
          for (let j = 0; j < this.allTopics.length; j++) {
            if (this.allTopics[j].id === this.userTopics[i].id) {
              this.allTopics.splice(j, 1);
              j -= 1;
            }
          }
        }
      });
  }

  getGroupTickets() {
    this.api
      .apiTicketsListGroupsRead(this.group_id.toString())
      .subscribe((tickets) => {
        this.tickets = tickets;
      });
  }

  navigateTopic(topic: Topic) {
    this.router.navigate(['topics/' + topic.id], {
      relativeTo: this.route,
    });
  }

  openTopicCreateModal() {
    const dialogRef = this.dialog.open(TopicCreateComponent, {
      width: '400px',
      height: 'auto',
      autoFocus: true,
      data: { group: this.group },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getUserTopicList();
    });
  }

  subscribeTopicModal(sub: boolean, topic: Topic) {
    const dialogRef = this.dialog.open(TopicSubscribeComponent, {
      width: '300px',
      height: 'auto',
      autoFocus: true,
      data: { sub: sub, topic: topic },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getUserTopicList();
    });
  }

  deleteTopicModal(topic: Topic) {
    const dialogRef = this.dialog.open(TopicDeleteComponent, {
      width: '300px',
      height: 'auto',
      autoFocus: true,
      data: { topic: topic },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getUserTopicList();
    });
  }

  navigateTicket(ticket: Ticket) {
    this.router.navigate(['/dashboard/tickets/' + ticket.id]);
  }
}
