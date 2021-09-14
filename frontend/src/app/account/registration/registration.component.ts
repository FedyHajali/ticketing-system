import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, AuthService } from 'src/app/api/services';
import { User, Group } from 'src/app/api/models';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  Groups: Group[] = [];

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
    const newGroups: Array<number | undefined> = [];

    this.Groups.filter((group) => {
      group.id == this.form.controls['groups'].value;
      newGroups.push(group.id);
    });

    const data: any = {
      username: this.form.controls['username'].value,
      email: this.form.controls['email'].value,
      password: this.form.controls['password'].value,
      first_name: this.form.controls['first_name'].value,
      last_name: this.form.controls['last_name'].value,
      groups: newGroups,
      is_staff: this.form.controls['is_staff'].value,
    };

    console.log(data);

    this.auth.authRegistrationCreate(data).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  changeGroup(group: any) {
    console.log(group);
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
