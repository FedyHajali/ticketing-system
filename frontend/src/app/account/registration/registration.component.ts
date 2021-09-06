import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RestService } from 'src/app/api/rest.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  messageSuccess = false;
  form = this.fb.group({
    username: ['' /*  Validators.required */],
    email: ['' /* [Validators.required, Validators.email] */],
    password: ['' /* Validators.required */],
    password2: ['' /* Validators.required */],
    first_name: ['' /* Validators.required */],
    last_name: ['' /* Validators.required */],
  });

  constructor(private fb: FormBuilder, private rs: RestService) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.form.value);
    this.rs.register(this.form.value).subscribe((response) => {
      console.log(response);
      setTimeout(() => {
        this.messageSuccess = true;
      }, 3000);
    });
  }
}
