import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { PasswordChange, User } from '../api/models';
import { AuthService } from '../api/services';
import { MustMatch, SharedService } from '../services/shared.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  user!: User;
  form = this.fb.group({
    username: [
      { value: '', disabled: true },
      [Validators.required, Validators.maxLength(20)],
    ],
    email: [
      { value: '', disabled: true },
      [Validators.required, Validators.email],
    ],
    password: [
      { value: '', disabled: true },
      [Validators.required, Validators.minLength(8), Validators.maxLength(20)],
    ],
    first_name: [{ value: '', disabled: true }],
    last_name: [{ value: '', disabled: true }],
    is_staff: [false, Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private shared: SharedService,
    private auth: AuthService,
    private dialog: MatDialog
  ) {
    this.shared.getActiveUser().subscribe((user) => {
      this.user = user;
      this.form.setValue({
        username: user.username,
        email: user.email,
        password: user.password,
        first_name: user.first_name,
        last_name: user.last_name,
        is_staff: user.is_staff,
      });
    });
  }

  ngOnInit(): void {}

  openChangePasswordModal() {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      width: '400px',
      height: 'auto',
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  form = this.fb.group(
    {
      new_password1: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      new_password2: ['', [Validators.required]],
    },
    {
      validator: MustMatch('new_password1', 'new_password2'),
    }
  );
  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private auth: AuthService,
    private shared: SharedService
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    let data: PasswordChange = {
      new_password1: this.form.controls.new_password1.value,
      new_password2: this.form.controls.new_password2.value,
    };
    this.auth.authPasswordChangeCreate(data).subscribe(
      (response) => {
        console.log(response);
        this.shared.showToastSuccess(
          'Change Password',
          'New password has been saved'
        );
        this.onNoClick();
      },
      (error) => {
        this.shared.showToastDanger('Change Password', error.error);
      }
    );
  }
}
