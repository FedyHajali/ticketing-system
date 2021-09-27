import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiService, AuthService } from 'src/app/api/services';
import { Topic, Group, User, Ticket } from '../../api/models';

@Component({
  selector: 'app-radial-chart-groups',
  templateUrl: './radial-chart-groups.component.html',
  styleUrls: ['./radial-chart-groups.component.scss']
})
export class RadialChartGroupsComponent implements OnInit {
  
  isClose: boolean = false;
  groups: Group[] = [];
  tickets: Ticket[] = [];
  users_group: User[]=[];
  total: number = 0;
  total_op: number = 0;
  total_pe: number = 0;
  total_cl: number = 0;
  total_ex: number = 0;
  public radarChartLabels: Label[] = [];

  public radarChartOptions: RadialChartOptions = {
    title:{
      display:true,
      text:'Distribution of tickets to groups'
    },
    responsive: true,
  };
  
  public radarChartData: ChartDataSets[] = [
    { data: [], label: 'open' },
    { data: [], label: 'pending/resolved' },
    { data: [], label: 'closed' },
    { data: [], label: 'expired' },
    { data: [], label: 'total' },
  ];
  public radarChartType: ChartType = 'radar';

  constructor(
    private api: ApiService,
    private auth: AuthService) 
    { }

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups() {
    this.auth.authGroupsListList().subscribe(
      (groups) => {
        this.groups = groups;
        this.groups.forEach((group)=> {
          this.api.apiTicketsListGroupsRead(group.id?.toString()!).subscribe((tickets) => {
            this.tickets = tickets;
            this.tickets.forEach((ticket)=> {
      
              if (ticket.status=='OP')
                this.total_op ++;
              if (ticket.status=='PE'|| ticket.status=='RE')
                this.total_pe ++;
              if (ticket.status=='CL')
                this.total_cl ++;
              if (ticket.status=='EX')
              this.total_ex++;
      
              this.total++
              });
          console.log(this.total)
          this.radarChartLabels.push(group.name)
          this.radarChartData[0].data?.push(this.total_op)
          this.radarChartData[1].data?.push(this.total_pe)
          this.radarChartData[2].data?.push(this.total_cl)
          this.radarChartData[3].data?.push(this.total_ex)
          this.radarChartData[4].data?.push(this.total)
          this.total=0
          this.total_op=0
          this.total_pe=0
          this.total_cl=0
          this.total_ex=0
          });
        });
      },
    );
  }
}
