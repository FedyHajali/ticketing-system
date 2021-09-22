import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/api/services';

@Component({
  selector: 'app-topic-subscribe',
  templateUrl: './topic-subscribe.component.html',
  styleUrls: ['./topic-subscribe.component.scss'],
})
export class TopicSubscribeComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TopicSubscribeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {}

  submit() {
    if (this.data.sub) {
      this.subscribeGroup(this.data.topic);
    } else {
      this.unsubscribeGroup(this.data.topic);
    }
  }

  subscribeGroup(topic: any) {
    this.api.apiTopicsAddUserUpdate(topic.id).subscribe((response) => {
      this.dialogRef.close();
    });
  }

  unsubscribeGroup(topic: any) {
    this.api.apiTopicsDeleteUserUpdate(topic.id).subscribe((response) => {
      this.dialogRef.close();
    });
  }
}
