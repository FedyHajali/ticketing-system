import { Component, OnInit } from '@angular/core';
import { User } from '../api/models';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  
  user!: User;
  constructor(private shared: SharedService) {
    this.shared.getActiveUser().subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.shared.showSpinner();
  }
}
