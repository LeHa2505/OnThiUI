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

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.less'],
})
export class SignupComponent implements OnInit {
  validateForm!: UntypedFormGroup;
  requestRegisterForm = {
    contractId: 0,
    username: String,
    email: String,
    password: String,
    role: '',
  };
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };
  num: number;
  isButtonLoading = false;
  passwordVisible = false;

  constructor(
    private fb: UntypedFormBuilder,
    private registerService: AuthenticationService,
    private mess: NzMessageService,
    private router: Router
  ) {}

  async submitForm(): Promise<void> {
    if (this.validateForm.valid) {
      this.isButtonLoading = true;
      this.requestRegisterForm.username = this.validateForm.value.username;
      this.requestRegisterForm.email = this.validateForm.value.email;
      this.requestRegisterForm.password = this.validateForm.value.password;
      this.requestRegisterForm.role = this.validateForm.value.role;
      this.registerService
        .register(this.requestRegisterForm)
        .subscribe((res) => {
          if (res.message == 'Register successfully') {
            this.mess.success('Register successfully!');
            this.isButtonLoading = false;
            this.router.navigate(['/auth/login']);
          } else this.mess.error('Register unsuccessfully!');
        }),
        (e) => {
          this.mess.error('Something is wrong!');
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

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      contractId: '',
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      nickname: [null, [Validators.required]],
      role: [null, [Validators.required]],
      agree: [false],
    });
  }
}
