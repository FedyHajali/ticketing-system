import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType, ChartLegendOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ApiService, AuthService } from 'src/app/api/services';
import { Topic, Group, User } from '../../api/models';


@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent implements OnInit {

  groups: Group[] = [];
  topics: Topic[] = [];
  users_group: User[]= []
  total_sub: number=0;
  total_topics: number=0;
  label: string='';
  height: number= 200

  
  public bubbleChartOptions: ChartOptions = {
    responsive: true,
    title:{
      display: true,
      text:'Groups'
    },
    scales: {
      xAxes: [
        {
          ticks: {
            min: 0,
          },
          scaleLabel:{
            display:true,
            labelString:'Topics'
          }, 
        }
      ],
      yAxes: [
        {
          ticks: {
            min: 0,
          },
          scaleLabel:{
            display:true,
            labelString:'Subscribers'
          },
        }
      ]
    }
  };

  public bubbleChartType: ChartType = 'bubble';
  public bubbleChartLegend = true;
  public bubbleChartData: ChartDataSets[] = [];
  public bubbleChartColors: Color[] = [];

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
        this.groups.forEach((group)=> {
          this.auth.authGroupsUserListRead(group.id?.toString()!).subscribe((users_group) => {
            this.api.apiTopicsListGroupRead(group.id?.toString()!).subscribe((topics) => {
              this.users_group=users_group
              this.total_sub=(this.users_group.length)
              this.topics = topics;
              this.total_topics=(this.topics.length)
              this.label=(group.name);
              this.bubbleChartData.push({data: [{ x: this.total_topics!, y: this.total_sub!, r: (this.total_sub)*this.total_topics}],label: this.label})
              this.bubbleChartColors.push({backgroundColor: this.getRandomColor(), borderColor: 'black',})
              this.total_topics=0;
              this.total_sub=0;
              this.label=''
            });
          });
        }); 
        this.bubbleChartData.shift()
        });
    
  }
  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  private rand(max: number): number {
    return Math.trunc(Math.random() * max);
  }
}
