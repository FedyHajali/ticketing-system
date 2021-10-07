import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Group } from 'src/app/api/models';
import { ApiService, AuthService } from 'src/app/api/services';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.scss'],
})
export class GroupCreateComponent implements OnInit {
  form = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)],
    ],
  });
  group!: Group;
  constructor(
    public dialogRef: MatDialogRef<GroupCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private auth: AuthService,
    private shared: SharedService
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

    this.auth.authGroupsCreateCreate(group).subscribe(
      (group) => {
        this.group = group;
        this.shared.showToastSuccess('Successfully create', 'Group Create');
        this.subscribe();
        this.onNoClick();
      },
      (error) => {
        this.shared.showToastDanger(error.error, 'Group Create');
      }
    );
  }

  subscribe() {
    if (this.group.id) {
      this.auth.authGroupsAddUserUpdate(this.group.id.toString()).subscribe(
        (response) => {
          this.shared.showToastSuccess(
            'Successfully subscripted',
            'Group subscription'
          );
          this.onNoClick();
        },
        (error) => {
          this.shared.showToastDanger(error.error, 'Group subscription');
        }
      );
    }
  }
}
