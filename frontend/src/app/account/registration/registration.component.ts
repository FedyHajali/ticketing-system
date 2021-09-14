import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { ApiService, AuthService } from 'src/app/api/services';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  Groups: any = [];

  form = this.fb.group({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
    is_staff: true,
    groups: null,
  });

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private authservice: AuthService,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getGroups();
  }

  onSubmit() {
    const data: User = {
      username: this.form.controls['username'].value,
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      first_name: this.form.controls['first_name'].value,
      last_name: this.form.controls['last_name'].value,
      groups: this.form.controls['groups'].value,
      is_staff: this.form.controls['is_staff'].value,
    };

    console.log(data);

    this.auth.authRegistrationCreate().subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error(error);
      }
    );

  }

  // register(data: any) {
  //   return this.httpClient
  //     .post<any>(this.baseUrl + '/auth/registration/', data)
  //     .pipe(
  //       tap(
  //         (res) => {
  //           console.log(res);
  //         },
  //         (error) => {
  //           console.error(error);
  //         }
  //       )
  //     );
  // }

  changeGroup(group: any) {
    this.Groups.setValue(group.target.value, {
      onlySelf: true,
    });
  }

  getGroups() {
    this.auth.authGroupListList().subscribe(
      (groups) => {
        console.log(groups);
        this.Groups = groups;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
