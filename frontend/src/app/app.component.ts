import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from './api/models';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private userSub!: Subscription;
  user: User | undefined;

  constructor(private shared: SharedService) {}

  ngOnInit(): void {
    this.user = this.shared.getActiveUser();
    this.userSub = this.shared.userSubject.subscribe(
      (user) => {
        this.user = this.shared.getActiveUser();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
