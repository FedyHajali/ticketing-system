import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/api/models';
import { ApiService } from 'src/app/api/services';

@Component({
  selector: 'app-ticket-add-receiver',
  templateUrl: './ticket-add-receiver.component.html',
  styleUrls: ['./ticket-add-receiver.component.scss'],
})
export class TicketAddReceiverComponent implements OnInit {
  form = this.fb.group({
    receivers: this.data.ticket.receivers,
  });
  isClose = false;
  receivers: User[] = [];
  constructor(
    public dialogRef: MatDialogRef<TicketAddReceiverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private api: ApiService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    // TODO
    // Chiamata per avere lista di tutti gli iscritti a più topic
  }

  onSubmit() {
    this.data.ticket = {
      ...this.data.ticket,
      receivers: this.form.controls.receivers.value,
    };
    const params = {
      userId: this.data.user.id,
      ticketId: this.data.ticket.id,
    };
    // this.api.apiTicketsUserAddUpdate(params).subscribe((response) => {
    //   console.log(response);
    // });
  }

  onChangeStatus(event: any) {
    this.isClose = false;
    if (!event) {
      this.isClose = true;
      console.log(this.form.controls.receivers.value);
    }
  }
}
