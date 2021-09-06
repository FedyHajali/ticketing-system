import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { RestService } from '../api/rest.service';
import Ticket from '../api/Ticket';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.scss'],
})
export class TicketComponent implements OnInit {
  tickets: any = [];
  wForm: FormGroup;

  constructor(private rs: RestService, private fb: FormBuilder) {
    this.wForm = this.fb.group({
      title: new FormControl(''),
      ticket_id: new FormControl(''),
      content: new FormControl(''),
    });
  }

  ngOnInit() {
    this.getTickets();
  }

  getTickets() {
    this.rs.getTickets().subscribe((response) => {
      this.tickets = response;
      console.log(this.tickets);
    });
  }

  onSubmit() {
    this.rs
      .postTicket({
        title: this.wForm.controls.title.value,
        ticket_id: this.wForm.controls.ticket_id.value,
        content: this.wForm.controls.content.value,
      })
      .subscribe((resp) => {
        console.info(resp);
        this.getTickets();
      });
  }
}
