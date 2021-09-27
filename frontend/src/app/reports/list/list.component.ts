import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiService, AuthService } from 'src/app/api/services';
import { Topic, Group, User, Ticket } from '../../api/models';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  users: User[] = []
  users_id: number[] = []
  receivers_id: number[] = []
  groups: Group[] = [];
  topics: Topic[] = [];
  tickets: Ticket[] = [];
  users_group: User[]=[];
  users_topic: User[]=[];
  total_created: number []= []
  total_received: number []= []
  
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService) 
    { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.api.apiTicketsListAllList().subscribe(
      (tickets) => {
        this.tickets = tickets;
        this.tickets.forEach((ticket)=> {
          if(this.users_id.indexOf(ticket.creator.id!) < 0) {
            this.users_id.push(ticket.creator.id!);
            this.users.push(ticket.creator)
            this.total_created.push(1)
          }
          else{
            this.total_created[this.users_id.indexOf(ticket.creator.id!)]++
            console.log(this.total_created);
          }
        });
      },      
    );
    
  }
}
