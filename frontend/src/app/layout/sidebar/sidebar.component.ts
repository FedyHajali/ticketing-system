import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Group, User } from 'src/app/api/models';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  // @Input() groups: Group[] = [];
  // @Output() changeGroupEvent = new EventEmitter<Group>();
  constructor() {}

  ngOnInit(): void {}

  // changeGroup(group: Group) {
  //   this.changeGroupEvent.emit(group);
  // }
}
