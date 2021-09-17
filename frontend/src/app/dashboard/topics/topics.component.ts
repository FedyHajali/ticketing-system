import { Component, Input, OnInit } from '@angular/core';
import { Topic } from 'src/app/api/models';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss'],
})
export class TopicsComponent implements OnInit {
  @Input() topic!: Topic;

  constructor() {}

  ngOnInit(): void {}
}
