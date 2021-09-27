import { Component, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color } from 'ng2-charts';
import { Label } from 'ng2-charts';
import { ApiService, AuthService } from 'src/app/api/services';
import { Topic, Group, User, Ticket } from '../../api/models';

@Component({
  selector: 'app-dynamic-graph',
  templateUrl: './dynamic-graph.component.html',
  styleUrls: ['./dynamic-graph.component.scss']
})
export class DynamicGraphComponent implements OnInit {

  groups: Group[] = [];
  tickets: Ticket[] = [];
  users_group: User[]= []
  total_expired: number =0;
  total_comments: number=0;
  labels: string[]=[];


  public barChartOptions: ChartOptions = {
    title:{
      display: true,
      text:'Correlation of comments / expired tickets'
  },
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Expired Tickets' },
    { data: [], label:  'Comments'}
  ];

  constructor(
    private api: ApiService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.getGroups();
  }

  getGroups() {
    this.auth.authGroupsListList().subscribe(
      (groups) => {
        this.groups = groups;
        this.getData()
        });
    
  }

  getData() {
    this.groups.forEach((group)=> {
      this.api.apiTicketsListGroupsRead(group.id?.toString()!).subscribe((tickets) => {
          this.tickets = tickets;
          this.tickets.forEach((ticket)=> {
            if(ticket.status=='EX')
              this.total_expired++
            this.total_comments+=ticket.comments?.length!
            });
          this.barChartData[0].data?.push(this.total_expired)
          this.barChartData[1].data?.push(this.total_comments)
          this.total_comments=0;
          this.total_expired=0;
          this.barChartLabels.push(group.name)
      });
    }); 
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
  }

}
