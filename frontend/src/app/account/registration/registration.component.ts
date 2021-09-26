import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, AuthService } from 'src/app/api/services';
import { User, Group } from 'src/app/api/models';
import { SharedService } from 'src/app/services/shared.service';
import { MustMatch } from '../../services/shared.service';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  groups: Group[] = [];
  
  form = this.fb.group(
    {
      username: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      password2: ['', Validators.required],
      first_name: [''],
      last_name: [''],
      is_staff: [false, Validators.required],
      groups: [null, Validators.required],
    },
    {
      validator: MustMatch('password', 'password2'),
    }
  );

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private authservice: AuthService,
    private shared: SharedService,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shared.showSpinner();
    this.getGroups();
  }

  onSubmit() {
    const data: any = {
      username: this.form.controls['username'].value,
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      first_name: this.form.controls['first_name'].value,
      last_name: this.form.controls['last_name'].value,
      groups: this.form.controls['groups'].value,
      is_staff: this.form.controls['is_staff'].value,
    };

    console.log('New User:', data);

    this.auth.authUsersRegistrationCreate(data).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getGroups() {
    this.auth.authGroupsListList().subscribe(
      (groups) => {
        this.groups = groups;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  clearGroupsChoice() {
    this.form.controls['groups'].reset();
  }
}
