import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';
import { RestService } from 'src/app/api/rest.service';

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
    firstname: '',
    lastname: '',
    isStaff: null,
    groups: [1],
  });

  // City Names
  Groups: any = ['Machine Learning', 'Big Data', 'Cyber Security', 'Cloud'];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const data = {
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value,
      groups: this.form.controls['groups'].value,
    };
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
}
