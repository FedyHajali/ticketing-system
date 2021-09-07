import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RestService } from 'src/app/api/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = this.fb.group({
    username: [''],
    password: [''],
  });
  constructor(private fb: FormBuilder, private rs: RestService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.rs.login(this.form.value);
  }
}
