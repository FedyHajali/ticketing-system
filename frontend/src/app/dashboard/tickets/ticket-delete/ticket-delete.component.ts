import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/api/services';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-ticket-delete',
  templateUrl: './ticket-delete.component.html',
  styleUrls: ['./ticket-delete.component.scss']
})
export class TicketDeleteComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TicketDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private shared: SharedService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {}

  onDelete() {
    this.api
      .apiTicketsDeleteDelete(this.data.ticket.id)
      .subscribe((response) => {
        console.log(response);
        this.onNoClick();
        this.shared.showToastSuccess(
          'Successfully deleted',
          'Ticket Delete'
        );
        this.onNoClick();
      },
      (error) => {
        this.shared.showToastDanger(error.error, 'Ticket Delete');
      });
  }
}
