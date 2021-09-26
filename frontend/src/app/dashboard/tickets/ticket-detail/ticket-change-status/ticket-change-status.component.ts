import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ticket } from 'src/app/api/models';
import { ApiService } from 'src/app/api/services';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-ticket-change-status',
  templateUrl: './ticket-change-status.component.html',
  styleUrls: ['./ticket-change-status.component.scss'],
})
export class TicketChangeStatusComponent implements OnInit {
  form = this.fb.group({
    status: this.data.ticket.status,
  });
  isClose = false;
  constructor(
    public dialogRef: MatDialogRef<TicketChangeStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private api: ApiService,
    private shared: SharedService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {}

  onSubmit() {
    this.data.ticket = {
      ...this.data.ticket,
      status: this.form.controls.status.value,
      last_updated_by: this.data.user,
    };
    const params = {
      ticketId: this.data.ticket.id,
      data: this.data.ticket,
    };
    if (this.data.user.is_staff) {
      this.api.apiTicketsUpdateStaffUpdate(params).subscribe(
        (response) => {
          this.shared.showToastSuccess(
            'Status successfully changed',
            'Change ticket status'
          );
          this.onNoClick();
        },
        (error) => {
          this.shared.showToastDanger(error.error, 'Change ticket status');
        }
      );
    } else if (this.data.ticket.creator.id === this.data.user.id) {
      this.api.apiTicketsUpdateCreatorUpdate(params).subscribe(
        (response) => {
          this.shared.showToastSuccess(
            'Status successfully changed',
            'Change ticket status'
          );
          this.onNoClick();
        },
        (error) => {
          this.shared.showToastDanger(error.error, 'Change ticket status');
        }
      );
    } else if (this.checkReceiver()) {
      this.api.apiTicketsUpdateReceiverUpdate(params).subscribe(
        (response) => {
          this.shared.showToastSuccess(
            'Status successfully changed',
            'Change ticket status'
          );
          this.onNoClick();
        },
        (error) => {
          this.shared.showToastDanger(error.error, 'Change ticket status');
        }
      );
    }
  }

  onChangeStatus(event: any) {
    this.isClose = false;
    if (!event) {
      this.isClose = true;
    }
  }

  checkReceiver() {
    for (let receiver of this.data.ticket.receivers) {
      if (receiver.id === this.data.user.id) return true;
    }
    return false;
  }
}
