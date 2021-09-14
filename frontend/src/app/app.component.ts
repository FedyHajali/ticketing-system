import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from './models/User';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private userSub!: Subscription;
  user: User = new User();

  constructor(private shared: SharedService) {}

  ngOnInit(): void {
    this.user = this.shared.checkUser();
    this.userSub = this.shared.userSubject.subscribe(
      (user) => {
        this.user = this.shared.checkUser();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
