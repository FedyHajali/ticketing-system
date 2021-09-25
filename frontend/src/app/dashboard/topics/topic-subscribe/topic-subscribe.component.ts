import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/api/services';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-topic-subscribe',
  templateUrl: './topic-subscribe.component.html',
  styleUrls: ['./topic-subscribe.component.scss'],
})
export class TopicSubscribeComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TopicSubscribeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private shared: SharedService
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
      
      this.shared.showToastSuccess(
        'Successfully subscripted',
        'Topic subscription'
      );
      this.onNoClick();
    },
    (error) => {
      this.shared.showToastDanger(error, 'Topic subscription');
    });
  }

  unsubscribeGroup(topic: any) {
    this.api.apiTopicsDeleteUserUpdate(topic.id).subscribe((response) => {
      
      this.shared.showToastSuccess(
        'Successfully unsubscripted',
        'Topic unsubscription'
      );
      this.onNoClick();
    },
    (error) => {
      this.shared.showToastDanger(error, 'Topic unsubscription');
    });
  }
}
