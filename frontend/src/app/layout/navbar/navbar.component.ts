import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy, AfterContentInit {
  public isAuthenticated = false;
  private userSub!: Subscription;
  user: User | undefined;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const userlogged: any = sessionStorage.getItem('user');
    this.isAuthenticated = userlogged == null ? false : true;

    this.userSub = this.auth.user.subscribe((user) => {
      if (!user) {
        this.isAuthenticated =
          sessionStorage.getItem('user') == null ? false : true;
      } else {
        this.isAuthenticated = true;
        this.ngAfterContentInit();
      }
    });
  }

  ngAfterContentInit() {
    if (this.isAuthenticated) {
      this.user = JSON.parse(<string>sessionStorage.getItem('user'));
    }
  }

  logout() {
    this.auth.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
