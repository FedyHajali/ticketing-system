import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Group, Ticket, Topic, User } from 'src/app/api/models';
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
  isLoading = true;
  selectedGroups: Group[] = [];
  selectedTopics!: Topic[];
  form = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
    ],
    content: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(100)],
    ],
    status: ['OP', Validators.required],
    groups: [null, Validators.required],
    topics: [null, Validators.required],
    receivers: [null, Validators.required],
    creator: this.user,
    last_updated_by: this.user,
    expiration: [null, Validators.required],
  });

  constructor(
    private auth: AuthService,
    private api: ApiService,
    private fb: FormBuilder,
    private shared: SharedService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.shared.getActiveUser().subscribe((user) => {
      this.user = user;
      this.isLoading = false;
    });
  }

  ngOnInit(): void {
    this.shared.showSpinner();
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
    this.selectedGroups?.forEach((group) => {
      if (group.id) {
        this.api
          .apiTopicsListUserGroupRead(group.id.toString())
          .subscribe((topics) => {
            this.topics = this.topics.concat(topics);
          });
      }
    });
  }

  getTopicReceivers() {
    this.receivers = [];
    this.selectedTopics?.forEach((topic) => {
      if (topic.id) {
        this.api
          .apiTopicsUserListRead(topic.id.toString())
          .subscribe((users) => {
            this.receivers = this.receivers.concat(users);
          });
      }
    });
  }

  onSubmit() {
    let ticket: Ticket = {
      title: this.form.controls.title.value,
      content: this.form.controls.content.value,
      status: this.form.controls.status.value,
      groups: this.form.controls.groups.value,
      topics: this.form.controls.topics.value,
      receivers: this.form.controls.receivers.value,
      creator: this.user,
      last_updated_by: this.user,
      expiration: this.form.controls.expiration.value.toISOString(),
    };
    this.api.apiTicketsCreateCreate(ticket).subscribe(
      (response) => {
        this.shared.showToastSuccess('Successfully create', 'Ticket Create');
        this.router.navigate(['/dashboard/tickets/' + response.id]);
      },
      (error) => {
        this.shared.showToastDanger(error.error, 'Ticket Create');
      }
    );
  }
}
