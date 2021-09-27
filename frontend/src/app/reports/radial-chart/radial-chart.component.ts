import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiService, AuthService } from 'src/app/api/services';
import { Topic, Group, User } from '../../api/models';

@Component({
  selector: 'app-radial-chart',
  templateUrl: './radial-chart.component.html',
  styleUrls: ['./radial-chart.component.scss']
})
export class RadialChartComponent implements OnInit {
  selectedGroup!: Group;
  form = this.fb.group({
    group: ''
  });
  isClose: boolean = false;
  groups: Group[] = [];
  topics: Topic[] = [];
  users_group: User[]=[];
  users_topic: User[]=[];
  total_sub: number = 0;
  public radarChartLabels: Label[] = [];

  public radarChartOptions: RadialChartOptions = {
    title:{
      display:true,
      text:'Distribution of subscribers to group topics'
    },
    responsive: true,
  };
  
  public radarChartData: ChartDataSets[] = [
    { data: [], label: '%Subscribers' }
  ];
  public radarChartType: ChartType = 'radar';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private auth: AuthService) 
    { }

  ngOnInit(): void {
    this.getGroups();
  }

  onChangeGroup(event: any) {
    this.isClose = false;
    if (!event) {
      this.isClose = true;
      console.log(this.selectedGroup)
      this.getSubscribersGroup()
      this.getTopicListGroup()
    }
  }

  getGroups() {
    this.auth.authGroupsListList().subscribe(
      (groups) => {
        this.groups = groups;
        this.form.setValue({group: groups[0]})
        this.getSubscribersGroup();
        this.getTopicListGroup()
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getTopicListGroup() {
    this.api.apiTopicsListGroupRead(this.form.controls.group.value.id).subscribe((topics) => {
      this.topics = topics;
      this.radarChartLabels=[]
      this.radarChartData[0].data=[]
      this.total_sub=0;

      this.topics.forEach((topic)=> {
        this.radarChartLabels.push(topic.name)
        this.total_sub += topic.users?.length!
        });
      this.topics.forEach((topic)=> {
        this.radarChartData[0].data?.push(topic.users?.length!/this.total_sub*100)
        });
      });
      
  }

  getSubscribersGroup() {
    this.auth.authGroupsUserListRead(this.form.controls.group.value.id).subscribe((users_group) => {
      this.users_group=users_group
      console.log(this.users_group)
    });
  }

}
