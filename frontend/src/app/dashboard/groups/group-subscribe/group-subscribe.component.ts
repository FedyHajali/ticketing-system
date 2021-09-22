import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/api/services';
import { GroupCreateComponent } from '../group-create/group-create.component';

@Component({
  selector: 'app-group-subscribe',
  templateUrl: './group-subscribe.component.html',
  styleUrls: ['./group-subscribe.component.scss'],
})
export class GroupSubscribeComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<GroupSubscribeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
  }

  submit() {
    if (this.data.sub) {
      this.subscribeGroup(this.data.group);
    } else {
      this.unsubscribeGroup(this.data.group);
    }
  }

  subscribeGroup(group: any) {
    this.auth.authGroupsAddUserUpdate(group.id).subscribe((response) => {
      this.dialogRef.close();
    });
  }

  unsubscribeGroup(group: any) {
    this.auth.authGroupsDeleteUserUpdate(group.id).subscribe((response) => {
      this.dialogRef.close();
    });
  }
}
