import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Group, Topic, User, Comment } from 'src/app/api/models';
import { Ticket } from 'src/app/api/models/ticket';
import { ApiService } from 'src/app/api/services';
import { SharedService } from 'src/app/services/shared.service';
import { TicketAddReceiverComponent } from './ticket-add-receiver/ticket-add-receiver.component';
import { TicketChangeStatusComponent } from './ticket-change-status/ticket-change-status.component';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss'],
})
export class TicketDetailComponent implements OnInit {
  ticket_id!: number;
  private sub: any;
  user!: User;
  group!: Group;
  topic!: Topic;
  ticket!: Ticket;
  panelOpenState = true;
  form = this.fb.group({
    comment: '',
  });
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private shared: SharedService,
    private api: ApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.user = this.shared.getActiveUser();
    this.sub = this.route.params.subscribe((params) => {
      this.ticket_id = +params['ticket_id'];
    });

    this.getTicketDetail(this.ticket_id);
  }

  getTicketDetail(ticket_id: number) {
    this.api.apiTicketsDetailRead(ticket_id.toString()).subscribe((ticket) => {
      this.ticket = ticket;
    });
  }

  addReceiverModal() {
    const dialogRef = this.dialog.open(TicketAddReceiverComponent, {
      width: '300px',
      height: 'auto',
      autoFocus: true,
      data: { ticket: this.ticket },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getTicketDetail(this.ticket_id);
    });
  }

  changeStatusModal() {
    const dialogRef = this.dialog.open(TicketChangeStatusComponent, {
      width: '300px',
      height: 'auto',
      autoFocus: true,
      data: { ticket: this.ticket, user: this.user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getTicketDetail(this.ticket_id);
    });
  }

  onSubmitComment() {
    let comment: Comment = {
      title: '--',
      content: this.form.controls.comment.value,
      creator: this.shared.getActiveUser(),
      ticket: this.ticket.id ? this.ticket.id : 0,
    };
    this.api.apiCommentsCreateCreate(comment).subscribe((response) => {
      console.log(response);
      this.shared.showSpinner();
      this.getTicketDetail(this.ticket_id);
    });
  }
}
