import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { AuthService } from 'src/app/api/services';
import { User } from 'src/app/api/models';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userSubject = new Subject<User>();
  user: User | undefined;
  form = this.fb.group({
    username: '',
    password: '',
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private shared: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shared.showSpinner();
  }

  onSubmit() {
    this.auth.authLoginCreate(this.form.value).subscribe(
      (response) => {
        sessionStorage.setItem('token', response.key);
        this.shared.setActiveUser();

        this.shared.showSpinner();

        if (this.shared.redirectUrl) {
          this.router.navigate([this.shared.redirectUrl]);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
