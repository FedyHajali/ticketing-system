import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group, Topic } from 'src/app/api/models';
import { ApiService } from 'src/app/api/services';

@Component({
  selector: 'app-topic-create',
  templateUrl: './topic-create.component.html',
  styleUrls: ['./topic-create.component.scss'],
})
export class TopicCreateComponent implements OnInit {
  form = this.fb.group({
    name: '',
    description: '',
  });
  constructor(
    public dialogRef: MatDialogRef<TopicCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private api: ApiService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {}

  create() {
    let topic: Topic = {
      name: this.form.controls['name'].value,
      description: this.form.controls['description'].value,
      group: this.data.group,
      users: [],
    };

    this.api.apiTopicsCreateCreate(topic).subscribe((response) => {
      console.log(response);
    });
  }
}
