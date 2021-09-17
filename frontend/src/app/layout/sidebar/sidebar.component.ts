import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Group } from 'src/app/api/models';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() groups: Group[] = [];
  @Output() changeGroupEvent = new EventEmitter<Group>();

  constructor() {}

  ngOnInit(): void {}

  changeGroup(group: Group) {
    this.changeGroupEvent.emit(group);
  }
}
