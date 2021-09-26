import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group, Topic } from 'src/app/api/models';
import { ApiService, AuthService } from 'src/app/api/services';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-topic-create',
  templateUrl: './topic-create.component.html',
  styleUrls: ['./topic-create.component.scss'],
})
export class TopicCreateComponent implements OnInit {
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(20)]],
    description: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(50)]],
  });
  group!: Group;
  topic!: Topic;
  constructor(
    public dialogRef: MatDialogRef<TopicCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private api: ApiService,
    private shared: SharedService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    console.log(this.data.group);
  }

  create() {
    this.topic = {
      name: this.form.controls['name'].value,
      description: this.form.controls['description'].value,
      group: this.data.group,
      users: [],
    };

    this.api.apiTopicsCreateCreate(this.topic).subscribe(
      (topic) => {
        this.topic = topic
        this.shared.showToastSuccess('Successfully create', 'Topic Create');
        this.subscribe();
        this.onNoClick();
      },
      (error) => {
        this.shared.showToastDanger(error.error, 'Topic Create');
      }
    );
  }

  subscribe() {
    if (this.topic.id) {
      this.api.apiTopicsAddUserUpdate(this.topic.id.toString()).subscribe(
        (response) => {
          this.shared.showToastSuccess(
            'Successfully subscripted',
            'Topic subscription'
          );
          this.onNoClick();
        },
        (error) => {
          this.shared.showToastDanger(error.error, 'Topic subscription');
        }
      );
    }
  }
}
