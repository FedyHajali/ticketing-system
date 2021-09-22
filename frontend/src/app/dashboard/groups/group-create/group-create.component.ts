import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group } from 'src/app/api/models';
import { ApiService, AuthService } from 'src/app/api/services';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss'],
})
export class GroupCreateComponent implements OnInit {
  form = this.fb.group({
    name: '',
  });
  constructor(
    public dialogRef: MatDialogRef<GroupCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private auth: AuthService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {}

  create() {
    let group: Group = {
      name: this.form.controls['name'].value,
      permissions: [],
    };

    this.auth.authGroupsCreateCreate(group).subscribe((response) => {
      console.log(response);
      this.dialogRef.close();
    });
  }
}
