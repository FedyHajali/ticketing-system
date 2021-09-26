import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Group, Topic, User, Comment } from 'src/app/api/models';
import { Ticket } from 'src/app/api/models/ticket';
import { ApiService } from 'src/app/api/services';
import { SharedService } from 'src/app/services/shared.service';
import { TicketDeleteComponent } from '../ticket-delete/ticket-delete.component';
import { TicketAddReceiverComponent } from './ticket-add-receiver/ticket-add-receiver.component';
import { TicketChangeStatusComponent } from './ticket-change-status/ticket-change-status.component';
import { TicketCommentDeleteComponent } from './ticket-comment-delete/ticket-comment-delete.component';

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
  userIsReceiver = false;
  userIsCreator = false;
  form = this.fb.group({
    comment: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(100)]],
  });
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private shared: SharedService,
    private api: ApiService,
    private fb: FormBuilder
  ) {
    this.user = this.shared.getActiveUser();
  }

  ngOnInit() {
    this.shared.showSpinner();
    this.sub = this.route.params.subscribe((params) => {
      this.ticket_id = +params['ticket_id'];
    });

    this.getTicketDetail(this.ticket_id);
  }

  getTicketDetail(ticket_id: number) {
    this.api.apiTicketsDetailRead(ticket_id.toString()).subscribe((ticket) => {
      this.ticket = ticket;
      this.checkUserIsReceiver();
      this.checkUserIsCreator();
    });
  }

  checkUserIsReceiver() {
    this.ticket?.receivers.forEach((receiver) => {
      if (receiver.id === this.user.id) {
        this.userIsReceiver = true;
      }
    });
  }

  checkUserIsCreator() {
    if (this.ticket.creator.id === this.user.id) {
      this.userIsCreator = true;
    }
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
    this.form.controls.comment.reset();
    this.api.apiCommentsCreateCreate(comment).subscribe(
      (response) => {
        this.shared.showSpinner();
        this.getTicketDetail(this.ticket_id);
        this.shared.showToastSuccess(
          'Comment successfully saved',
          'Add Comment'
        );
      },
      (error) => {
        this.shared.showToastDanger(error.error, 'Add Comment');
      }
    );
  }

  deleteTicketModal(ticket: Ticket) {
    const dialogRef = this.dialog.open(TicketDeleteComponent, {
      width: '350px',
      height: 'auto',
      autoFocus: true,
      data: { ticket: ticket },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['/dashboard']);
    });
  }

  deleteCommentModal(comment: Comment) {
    const dialogRef = this.dialog.open(TicketCommentDeleteComponent, {
      width: '350px',
      height: 'auto',
      autoFocus: true,
      data: { comment: comment },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getTicketDetail(this.ticket_id);
    });
  }

  navigateGroup(group: Group) {
    this.router.navigate(['/dashboard/groups/' + group.id]);
  }
}
