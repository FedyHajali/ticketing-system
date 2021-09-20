import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Group, Topic, User } from 'src/app/api/models';
import { ApiService } from 'src/app/api/services';
import { SharedService } from 'src/app/services/shared.service';
import { TopicCreateComponent } from './topic-create/topic-create.component';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  group_id!: number;
  private sub: any;
  user: User | undefined;
  topics: Topic[] | undefined;
  constructor(
    private shared: SharedService,
    private dialog: MatDialog,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.shared.getActiveUser();
    this.sub = this.route.params.subscribe((params) => {
      this.group_id = +params['group_id']; // (+) converts string 'id' to a number
      this.getTopicList(this.group_id);
    });
  }

  openTopicModalCreate() {
    const dialogRef = this.dialog.open(TopicCreateComponent, {
      width: '400px',
      height: '400px',
      autoFocus: true,
      data: { group: this.group_id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getTopicList(this.group_id);
    });
  }

  getTopicList(id: number) {
    this.shared.getTopicList(id).subscribe((topics) => {
      this.topics = topics;
    });
  }

  navigateTickets(id: any) {
    this.router.navigate(['tickets', id], { relativeTo: this.route });
  }
}
