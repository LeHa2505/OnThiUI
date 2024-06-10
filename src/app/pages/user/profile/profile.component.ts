import { Component } from '@angular/core';
import { t } from 'chart.js/dist/chunks/helpers.core';
import { UserService } from 'src/app/service/user-service/user.service';
import {
  NonNullableFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less'],
})
export class ProfileComponent {
  role = localStorage.getItem('role');
  idUser = localStorage.getItem('user_id');
  userAvatar = localStorage.getItem('avatar');
  username = localStorage.getItem('username');
  userInfo = {
    username: '',
    email: '',
    phoneNumber: '',
    address: '',
  };
  isButtonLoading = false;
  isLoadingPage = true;
  isEditing = false;
  validateForm!: UntypedFormGroup;
  isVisible = false;
  oldpasswordVisible = false;
  passwordVisible = false;
  againpasswordVisible = false;
  oldPassword = '';
  password = '';
  passwordEnteredAgain = '';

  constructor(
    private userSer: UserService,
    private fb: NonNullableFormBuilder,
    private msg: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      username: [this.userInfo.username, [Validators.required]],
      email: [this.userInfo.email, [Validators.required]],
      phoneNumber: '',
      address: '',
    });
  }

  getUserInfo() {}

  edit() {
    this.isEditing = true;
  }

  save() {}

  openForm() {
    this.isVisible = true;
    this.oldPassword = '';
    this.password = '';
    this.passwordEnteredAgain = '';
  }

  handleCancel() {
    this.isVisible = false;
  }

  handleOk() {}

  ngOnInit(): void {
    this.getUserInfo();
  }
}
