import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Group, Topic, User } from 'src/app/api/models';
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
  userTopics!: Topic[];
  allTopics!: Topic[];
  constructor(
    private shared: SharedService,
    private dialog: MatDialog,
    private api: ApiService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.shared.getActiveUser();
    this.sub = this.route.params.subscribe((params) => {
      this.group_id = +params['group_id']; // (+) converts string 'id' to a number
      this.getGroup();
      this.getUserTopicList(this.group_id);
    });
  }

  getGroup() {
    this.auth
      .authGroupsDetailRead(this.group_id.toString())
      .subscribe((group) => {
        this.group = group;
      });
  }

  getUserTopicList(id: number) {
    this.api.apiTopicsListUserGroupRead(id.toString()).subscribe((topics) => {
      this.userTopics = topics;
      this.getAllTopicList(this.group_id);
    });
  }

  getAllTopicList(id: number) {
    this.api.apiTopicsListGroupRead(id.toString()).subscribe((topics) => {
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
      this.getUserTopicList(this.group_id);
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
      this.getUserTopicList(this.group_id);
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
      this.getUserTopicList(this.group_id);
    });
  }
}
