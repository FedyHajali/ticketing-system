import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/api/services';
import { User } from '../../api/models';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy, AfterContentInit {
  public isAuthenticated = false;
  private userSub!: Subscription;
  user: User | undefined;
  constructor(
    private shared: SharedService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.shared.isAuthenticated();
    // const userlogged: any = sessionStorage.getItem('user');
    // this.isAuthenticated = userlogged == null ? false : true;

    this.userSub = this.shared.userSubject.subscribe((user) => {
      if (!user) {
        this.isAuthenticated = this.shared.isAuthenticated();
      } else {
        this.isAuthenticated = true;
      }
      this.ngAfterContentInit();
    });
  }

  ngAfterContentInit() {
    if (this.isAuthenticated) {
      this.user = JSON.parse(<string>sessionStorage.getItem('user'));
    }
  }

  logout() {
    this.auth.authLogoutCreate().subscribe((response) => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
      this.shared.isLoggedIn = false;
      this.shared.userSubject.next();
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
