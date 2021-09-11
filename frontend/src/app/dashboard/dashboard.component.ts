import { Component, OnInit } from '@angular/core';
import { AuthService } from '../api/auth.service';
import { RestService } from '../api/rest.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
  }
}
