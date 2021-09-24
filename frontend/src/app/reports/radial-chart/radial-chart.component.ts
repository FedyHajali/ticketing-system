import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { ApiService, AuthService } from 'src/app/api/services';
import { Topic, Group } from '../../api/models';

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
  topics: Topic[] = []
  public radarChartLabels: Label[] = [];

  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  
  public radarChartData: ChartDataSets[] = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: '%Subscriber' },
    { data: [28, 48, 40, 19, 96, 27, 100], label: '%ticketOpen' }
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
      this.getTopicListGroup()
    }
  }

  getGroups() {
    this.auth.authGroupsListList().subscribe(
      (groups) => {
        this.groups = groups;
        this.form.setValue({group: groups[0]})
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
      this.radarChartLabels=[];
      this.radarChartData=[];
      this.topics.forEach((topic)=> {
        this.radarChartLabels.push(topic.name)
        this.radarChartData[0].data?.push(30)
        this.radarChartData[1].data?.push(13)
      })
    });
  }


}
