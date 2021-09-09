import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';
import { RestService } from 'src/app/api/rest.service';
import { User } from 'src/app/api/User';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
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

  // City Names
  Groups: any = [];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getGroups();
  }

  onSubmit() {
    const data: User = {
      id: null,
      username: this.form.controls['username'].value,
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      first_name: this.form.controls['first_name'].value,
      last_name: this.form.controls['last_name'].value,
      groups: this.form.controls['groups'].value,
      is_staff: this.form.controls['is_staff'].value,
    };

    console.log(data);
    this.auth.register(data).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  changeGroup(group: any) {
    this.Groups.setValue(group.target.value, {
      onlySelf: true,
    });
  }

  getGroups() {
    this.auth.getGroups().subscribe((groups) => {
      console.log(groups);
      this.Groups = groups;
    });
  }
}
