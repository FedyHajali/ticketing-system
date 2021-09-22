import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Group, Topic, User } from 'src/app/api/models';
import { ApiService, AuthService } from 'src/app/api/services';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-ticket-create',
  templateUrl: './ticket-create.component.html',
  styleUrls: ['./ticket-create.component.scss'],
})
export class TicketCreateComponent implements OnInit {
  groups: Array<Group> = [];
  topics: Array<Topic> = [];
  receivers: Array<User> = [];
  user!: User;
  status = [
    { value: 'OP', viewValue: 'Open' },
    { value: 'PE', viewValue: 'In Pending' },
    { value: 'RE', viewValue: 'Resolved' },
    { value: 'CL', viewValue: 'Closed' },
    { value: 'EX', viewValue: 'Expired' },
  ];
  isClose: boolean = false;
  selectedGroups!: string[];
  selectedTopics!: string[];
  form = this.fb.group({
    title: '',
    content: '',
    status: 'OP',
    groups: null,
    topics: null,
    receivers: null,
    creator: this.user,
    last_updated_by: this.user,
  });

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private fb: FormBuilder,
    private shared: SharedService
  ) {
    this.user = this.shared.getActiveUser();
  }

  ngOnInit(): void {
    this.auth.authGroupsListUserList().subscribe((groups) => {
      this.groups = groups;
    });
  }

  onChangeGroup(event: any) {
    this.isClose = false;
    if (!event) {
      this.isClose = true;
      this.selectedGroups = this.form.controls.groups.value;
      this.getGroupsTopics();
    }
  }

  onChangeTopic(event: any) {
    this.isClose = false;
    if (!event) {
      this.isClose = true;
      this.selectedTopics = this.form.controls.topics.value;
      this.getTopicReceivers();
    }
  }

  getGroupsTopics() {
    this.topics = [];
    this.selectedGroups?.forEach((group_id) => {
      this.api.apiTopicsListUserGroupRead(group_id).subscribe((topics) => {
        this.topics = this.topics.concat(topics);
        console.log(this.topics);
      });
    });
  }

  getTopicReceivers() {
    this.receivers = [];
    this.selectedTopics?.forEach((topic_id) => {
      this.api.apiTopicsUserListRead(topic_id).subscribe((users) => {
        console.log(users);
        this.receivers = this.receivers.concat(users);
        console.log(this.receivers);
      });
    });
  }

  onSubmit() {
    console.log(this.form)
  }
}
