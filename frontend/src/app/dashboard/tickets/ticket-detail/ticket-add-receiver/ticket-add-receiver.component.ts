import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/api/models';
import { ApiService } from 'src/app/api/services';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-ticket-add-receiver',
  templateUrl: './ticket-add-receiver.component.html',
  styleUrls: ['./ticket-add-receiver.component.scss'],
})
export class TicketAddReceiverComponent implements OnInit {
  form = this.fb.group({
    receiver: null,
  });
  isClose = false;
  receivers: User[] = [];
  constructor(
    public dialogRef: MatDialogRef<TicketAddReceiverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private api: ApiService,
    private shared: SharedService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.getTopicsReceivers();
  }

  onSubmit() {
    const params = {
      userId: this.form.controls.receiver.value.id,
      ticketId: this.data.ticket.id,
    };
    this.api.apiTicketsUserAddUpdate(params).subscribe(
      (response) => {
        this.shared.showToastSuccess(
          'Receiver successfully added',
          'Add Receiver'
        );
        this.onNoClick();
      },
      (error) => {
        this.shared.showToastDanger(error.error, 'Add Receiver');
      }
    );
  }

  getTopicsReceivers() {
    this.api
      .apiTicketsAllTopicsUsersRead(this.data.ticket.id)
      .subscribe((receivers) => {
        this.receivers = receivers;
        this.removeTicketReceiversFromTopicReceivers();
      });
  }

  onChangeStatus(event: any) {
    this.isClose = false;
    if (!event) {
      this.isClose = true;
    }
  }

  removeTicketReceiversFromTopicReceivers() {
    for (let receiverTopics of this.receivers) {
      for (let receiverTicket of this.data.ticket.receivers) {
        if (receiverTopics.id === receiverTicket.id) {
          this.receivers = this.receivers.splice(
            this.receivers.indexOf(receiverTicket),
            1
          );
        }
      }
    }
  }
}
