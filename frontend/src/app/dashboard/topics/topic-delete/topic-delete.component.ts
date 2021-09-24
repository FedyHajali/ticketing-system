import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/api/services';

@Component({
  selector: 'app-topic-delete',
  templateUrl: './topic-delete.component.html',
  styleUrls: ['./topic-delete.component.scss']
})
export class TopicDeleteComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TopicDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {}

  onDelete() {
    this.api
      .apiTopicsDeleteDelete(this.data.topic.id)
      .subscribe((response) => {
        console.log(response);
        this.onNoClick();
      });
  }
}
