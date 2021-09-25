import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/api/services';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-ticket-comment-delete',
  templateUrl: './ticket-comment-delete.component.html',
  styleUrls: ['./ticket-comment-delete.component.scss'],
})
export class TicketCommentDeleteComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TicketCommentDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private shared: SharedService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {}

  onDelete() {
    this.api.apiCommentsDeleteDelete(this.data.comment.id).subscribe(
      (response) => {
        this.shared.showToastSuccess('Successfully deleted', 'Comment Delete');
        this.onNoClick();
      },
      (error) => {
        this.shared.showToastDanger(error.error, 'Comment Delete');
      }
    );
  }
}
