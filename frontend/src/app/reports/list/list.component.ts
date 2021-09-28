import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiService, AuthService } from 'src/app/api/services';
import { Topic, Group, User, Ticket } from '../../api/models';

export interface Data {
  username?: string;
  created?: number;
  topics?: number;
  groups?: number;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  isClose: boolean = false;
  selectedOption!: string;
  form = this.fb.group({
    group: ''
  });
  users: User[] = []
  users_id: number[] = []
  receivers_id: number[] = []
  groups: Group[] = [];
  topics: Topic[] = [];
  tickets: Ticket []= [];
  users_group: User[]=[];
  options: string[]= ['created', 'topics', 'groups']
  total_users: User []= []
  data: Data [] = []
  prova: Data [] = []
  numbers: number[]= Array.from(Array(10).keys())

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService) 
    { }

  ngOnInit(): void {
    this.form.setValue({group: 'groups'})
    this.getUsers();
  }

  getUsers(){
    this.auth.authUsersListList().subscribe((users)=>{
      this.users=users;
      this.users.forEach((user, i)=>{
        this.groups=user.groups;
        var obj = {username: '', created: 0, topics: 0, groups:0}
        obj.groups=user.groups.length;
        obj.username=user.username
        this.api.apiTicketsListCreatorRead(user.id?.toString()!).subscribe((tickets)=>{
          this.tickets=tickets;
          obj.created=this.tickets.length
          this.groups.forEach((group)=>{
            this.api.apiTopicsListGroupRead(group.id?.toString()!).subscribe((topics)=>{
              this.topics=topics;
              this.topics.forEach((topic)=>{
                topic.users?.forEach((user_topic)=>{
                  if(user_topic.id==user.id)
                  obj.topics+=1
                });
              });
            });
          });
        });
      this.data.push(obj)
      })
      this.data.sort((a,b)=> (a.groups! < b.groups! ? 1 : -1))
    })
  }

  onChangeGroup(event: any) {
    this.isClose = false;
    if (!event) {
      this.isClose = true;
      console.log(this.selectedOption)
      if(this.form.controls.group.value == 'topics')
      this.data.sort((a,b)=> (a.topics! < b.topics! ? 1 : -1))
      if(this.form.controls.group.value == 'groups')
      this.data.sort((a,b)=> (a.groups! < b.groups! ? 1 : -1))
      if(this.form.controls.group.value == 'created')
      this.data.sort((a,b)=> (a.created! < b.created! ? 1 : -1))
    }
  }
}


