import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  validateFormLogin!: UntypedFormGroup;
  requestLoginForm = {
    email: String,
    password: String,
  };
  isLoginFailed: boolean;
  isLoading = false;
  isLogin = false;
  passwordVisible = false;

  constructor(
    private fb: UntypedFormBuilder,
    private loginService: AuthenticationService,
    public router: Router,
    private msg: NzMessageService,
    private notification: NzNotificationService
  ) {}

  submitForm(): void {
    this.isLoading = true;
    if (this.validateFormLogin.valid) {
      this.requestLoginForm.email = this.validateFormLogin.value.email;
      this.requestLoginForm.password = this.validateFormLogin.value.password;

      this.loginService.login(this.requestLoginForm).subscribe(
        (res) => {
          if (res.success) {
            this.createSuccessNotification(res.message);
            this.isLoading = false;
            this.router.navigateByUrl('/');
          } else {
            this.createFailNotification(res.message);
            this.isLoginFailed = true;
            this.isLoading = false;
          }
        },
        (error) => {
          this.createFailNotification(
            'Sai email hoặc mật khẩu! Vui lòng nhập lại!'
          );
          this.isLoginFailed = true;
          this.isLoading = false;
          // Xử lý lỗi nếu cần thiết
        }
      );
    } else {
      Object.values(this.validateFormLogin.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  createSuccessNotification(message: string): void {
    this.notification.create('success', '', message).onClick.subscribe(() => {
      console.log('notification clicked!');
    });
  }

  createFailNotification(message: string): void {
    this.notification
      .create('error', '', message, {
        nzStyle: {
          width: '26.5rem',
          marginLeft: '-265px',
          backgroundColor: '#FFF',
        },
        nzClass: 'test-class',
      })
      .onClick.subscribe(() => {
        console.log('notification clicked!');
      });
  }

  checkIsLogin() {
    if (localStorage.getItem('id_token')) {
      this.isLogin = true;
    }
    if (this.isLogin) {
      this.router.navigateByUrl('/');
    }
  }

  ngOnInit(): void {
    this.validateFormLogin = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: true,
    });

    this.checkIsLogin();
  }
}
