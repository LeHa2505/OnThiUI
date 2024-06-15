import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
// import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-student-manager',
  templateUrl: './student-manager.component.html',
  styleUrls: ['./student-manager.component.less']
})

export class StudentManagerComponent {
  listOfData: any[] = [];
  isVisible = false;

  firstName = '';
  lastName = '';
  gender = '';
  bod = '';
  phoneNumber = '';
  email = '';
  id: any;

  constructor(
    private mess: NzMessageService,
    private modal: NzModalService
  ) {}

  getListUser() {
    // this.serUser.getListUser().subscribe((res: any) => {
    //   this.listOfData = res.userInfos;
    // });
  }

  showModal(data): void {
    this.isVisible = true;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.gender = data.sex;
    this.email = data.user.email;
    this.phoneNumber = data.phoneNumber;
    this.bod = data.dateOfBirth;
    this.id = data.user.id;
  }

  handleOk(): void {
    this.isVisible = false;

    // this.serUser
    //   .updateIserInfo(
    //     {
    //       date_of_birth: this.bod,
    //       sex: this.gender,
    //       last_name: this.lastName,
    //       phone_number: this.phoneNumber,
    //       first_name: this.firstName,
    //     },
    //     this.id
    //   )
    //   .subscribe((res: any) => {
    //     console.log(res);
    //     this.mess.success(res.message);
    //     this.getListUser();
    //   });
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  deleteUser(userId:any){
    // this.serUser.deleteUser(userId).subscribe((res:any)=>{
    //   console.log(res);
    //   this.mess.success(res.message);
    //   this.getListUser();
    // })
  }

  showDeleteConfirm(data): void {
    const deleteId = data.user.id;
    this.modal.confirm({
      nzTitle: 'Xác nhận xóa?',
      nzContent: '',
      nzOkText: 'Xóa',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteUser(deleteId),
      nzCancelText: 'Hủy',
      nzOnCancel: () => console.log('Cancel'),
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getListUser();
  }
}