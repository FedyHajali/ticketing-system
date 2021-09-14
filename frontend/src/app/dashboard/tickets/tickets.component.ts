import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from 'src/app/api/models';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  @Input()
  ticket!: Ticket;
  
  constructor() { }

  ngOnInit(): void {
  }

}
