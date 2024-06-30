import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { AuthenticationService } from 'src/app/service/authentication/authentication.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { ethers } from 'ethers';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less'],
})
export class SignupComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  requestRegisterForm = {
    username: String,
    email: String,
    password: String,
    typeUser: Number(0),
    province: String,
    school: String
  };
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };
  num: number;
  isButtonLoading = false;
  passwordVisible = false;
  listProvinces: any[] = [];
  selectedProvince: any;
  filteredProvinces: any

  constructor(
    private fb: UntypedFormBuilder,
    private registerService: AuthenticationService,
    private mess: NzMessageService,
    private notification: NzNotificationService,
    private router: Router,
    private userService: UserService
  ) {}

  initProvinces() {
    this.userService.getAllProvinces().subscribe((res) => {
      this.listProvinces = res.data.data;
    });
  }

  async submitForm(): Promise<void> {
    if (this.validateForm.valid) {
      this.isButtonLoading = true;
      this.requestRegisterForm.username = this.validateForm.value.username;
      this.requestRegisterForm.email = this.validateForm.value.email;
      this.requestRegisterForm.password = this.validateForm.value.password;
      this.requestRegisterForm.typeUser = Number(this.validateForm.value.role);
      this.registerService
        .register(this.requestRegisterForm)
        .subscribe((res) => {
          if (res.success) {
            this.createNotification(res.message, 'success');
            this.isButtonLoading = false;
            this.router.navigate(['/auth/login']);
          } else {
            this.createNotification(res.message, 'error');
          }
        }),
        (e) => {
          this.createNotification('Có lỗi xảy ra', 'warning');
          this.isButtonLoading = false;
        };
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls['checkPassword'].updateValueAndValidity()
    );
  }

  confirmationValidator = (
    control: UntypedFormControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  createNotification(message: string, type: string): void {
    this.notification.create(type, '', message).onClick.subscribe(() => {
    });
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      username: [null, [Validators.required]],
      province: [null, [Validators.required]],
      school: [null, [Validators.required]],
      role: [null, [Validators.required]],
    });
    this.initProvinces();
  }
}
