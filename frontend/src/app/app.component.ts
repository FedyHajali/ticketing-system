import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from './models/User';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private userSub!: Subscription;
  user: User = new User();

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.user = this.auth.checkUser();
    this.userSub = this.auth.userSubject.subscribe((user) => {
      this.user = this.auth.checkUser();
    });
  }
}
