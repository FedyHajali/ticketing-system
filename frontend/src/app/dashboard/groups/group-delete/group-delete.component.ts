import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/api/services';

@Component({
  selector: 'app-group-delete',
  templateUrl: './group-delete.component.html',
  styleUrls: ['./group-delete.component.scss'],
})
export class GroupDeleteComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<GroupDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private auth: AuthService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {}

  onDelete() {
    this.auth
      .authGroupsDeleteDelete(this.data.group.id)
      .subscribe((response) => {
        console.log(response);
        this.onNoClick();
      });
  }
}
