import { Component, OnInit } from '@angular/core';
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
export class ProfileComponent implements OnInit {
  role = localStorage.getItem('role');
  idUser = localStorage.getItem('user_id');
  userAvatar = localStorage.getItem('avatar');
  username = localStorage.getItem('username');
  email = localStorage.getItem('email');
  userInfo: any;
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
  newUserName: string;
  phoneNumber: string;
  address: string;
  facebook: string;
  instagram: string;
  gender: any;

  constructor(
    private userSer: UserService,
    private fb: NonNullableFormBuilder,
    private msg: NzMessageService
  ) {
    this.validateForm = this.fb.group({
      username: [this.newUserName, [Validators.required]],
      email: [this.phoneNumber, [Validators.required]],
      phoneNumber: this.phoneNumber,
      address: this.address,
    });
  }

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userSer.getUserInfo(this.email).subscribe((res) => {
      if (res.success) {
        this.userInfo = res.data;
        this.newUserName = res.data.USERNAME;

        if (res.data.GENDER) {
          this.gender = res.data.GENDER;
        }
        if (res.data.ADDRESS) {
          this.address = res.data.ADDRESS;
        }
      }
    });
  }

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

  updateInfo() {
    this.isEditing = true;
  }
}
