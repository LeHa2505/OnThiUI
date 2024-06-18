import { Component, OnInit } from '@angular/core';
import { tr } from 'date-fns/locale';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject } from 'rxjs';
import { UploadService } from 'src/app/service/upload-service/upload.service';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.less'],
})
export class UserManageComponent implements OnInit {
  listCatalogue: any[] = [];
  listOfData = [];
  listOfDisplayData = [];
  transactionName: any;
  transactionAmount: any;
  transactionType: any;
  transactionId: any;
  transactionNote: any;
  transactionCategory = '';
  categoryId: any;
  dateTransaction = null;
  editedItem: any;
  warning = false;
  isDetailVisible = false;
  detailTitle = 'Thông tin chi tiết về người dùng';
  searchValue = '';
  aa: boolean = false;
  gender = null;
  active = null;
  userRole = null;
  date = [];
  isVisible = false;
  isVisibleUpdate = false;
  comfirmText = 'Xác nhận chỉnh sửa';
  userInfo: any;
  userInfoOld: any;
  listProvinces: any;
  searchChange$ = new BehaviorSubject('');
  filteredProvinces: any[] = [];

  constructor(
    private mess: NzMessageService,
    private userService: UserService,
    private modal: NzModalService,
    private fileService: UploadService,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.getAllUserAPI();
    this.initProvinces();
  }
  setIndex(ii) {
    this.aa = ii;
  }

  padTo2Digits(num: number) {
    return num.toString().padStart(2, '0');
  }
  formatDate(d: any) {
    let date = new Date(d);
    return [
      date.getFullYear(),
      this.padTo2Digits(date.getMonth() + 1),
      this.padTo2Digits(date.getDate()),
    ].join('-');
  }

  onChangeTime(result: Date): void {
    // this.dateTransaction = this.datepipe.transform(result, 'yyyy-MM-dd');
    this.dateTransaction = this.formatDate(result);
  }

  handleOk(): void {
    this.isVisible = false;
  }

  showModalEdit(data) {
    this.isVisibleUpdate = true;
    this.userInfo = data;
    this.userInfoOld = data;
  }

  handleEditOk() {
    this.isVisibleUpdate = false;
    this.userService.updateUserInfo(this.userInfo).subscribe((res) => {
      if (res.success) {
        this.createNotification(res.message, 'success');
      } else {
        this.createNotification(res.message, 'error');
        this.userInfo = this.userInfoOld;
      }
    });
  }

  handleEditCancel(): void {
    this.isVisibleUpdate = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getAllUserAPI() {
    this.listOfData = [];
    this.userService.getAllUser().subscribe((res: any) => {
      if (res.success) {
        res.data.forEach((element) => {
          let item = {
            ID_USER: element.ID_USER,
            ID_SCHOOL: element.ID_SCHOOL,
            TYPE_USER: element.TYPE_USER,
            USERNAME: element.USERNAME,
            EMAIL: element.EMAIL,
            PHONE: element.PHONE,
            GENDER: element.GENDER,
            BOD: element.BOD,
            ADDRESS: element.ADDRESS,
            AVATAR: element.AVATAR,
            DESCRIPTION: element.DESCRIPTION,
            FACEBOOK: element.FACEBOOK,
            INSTAGRAM: element.INSTAGRAM,
            ACTIVE: element.ACTIVE,
            SCHOOL_INFO: element.SCHOOL_INFO,
          };
          if (element.TYPE_USER != 0) {
            this.listOfData.push(item);
          }
        });
        this.listOfDisplayData = [...this.listOfData];
      }
    });
  }

  initProvinces() {
    this.userService.getAllProvinces().subscribe((res) => {
      this.listProvinces = res.data.data;
      this.filteredProvinces = [...this.listProvinces];
    });
  }

  onSearch(value: string): void {
    if (value) {
      const searchValueLower = value.trim().toLowerCase();
      this.filteredProvinces = this.listProvinces.filter((item: any) => {
        return item.name.toLowerCase().includes(searchValueLower);
      });
    } else {
      this.filteredProvinces = [...this.listProvinces]; // Reset to original list if search is cleared
    }
  }

  showModalDetail(data: any) {
    this.userInfo = data;
    this.isDetailVisible = true;
  }

  handleDetailCancel(): void {
    this.isDetailVisible = false;
  }

  handleDetailOk(): void {
    this.isDetailVisible = false;
  }

  search() {
    if (this.searchValue != null) {
      this.listOfDisplayData = this.listOfData.filter((item: any) => {
        const searchValueLower = this.searchValue.trim().toLowerCase();
        return (
          (item.PHONE &&
            item.PHONE.toLowerCase().indexOf(searchValueLower) > -1) ||
          (item.EMAIL &&
            item.EMAIL.toLowerCase().indexOf(searchValueLower) > -1) ||
          (item.USERNAME &&
            item.USERNAME.toLowerCase().indexOf(searchValueLower) > -1) ||
          (item.ADDRESS &&
            item.ADDRESS.toLowerCase().indexOf(searchValueLower) > -1) ||
          (item.FACEBOOK &&
            item.FACEBOOK.toLowerCase().indexOf(searchValueLower) > -1) ||
          (item.INSTAGRAM &&
            item.INSTAGRAM.toLowerCase().indexOf(searchValueLower) > -1)
        );
      });
    }

    if (this.gender != null && this.gender != 'Tất cả') {
      this.listOfDisplayData = this.listOfDisplayData.filter(
        (item: any) => item.GENDER == this.gender
      );
      if (this.gender == 3) {
        this.listOfDisplayData = this.listOfDisplayData.filter(
          (item: any) => item.GENDER == null || item.GENDER == ''
        );
      }
    }

    if (this.active != null && this.active != 'Tất cả') {
      this.listOfDisplayData = this.listOfDisplayData.filter(
        (item: any) => item.ACTIVE == this.active
      );
    }

    if (this.userRole != null && this.userRole != 'Tất cả') {
      this.listOfDisplayData = this.listOfDisplayData.filter(
        (item: any) => item.TYPE_USER == this.userRole
      );
    }
  }

  resetValueSelected() {
    this.active = null;
    this.gender = null;
    this.userRole = null;
    this.searchValue = '';
    this.search();
  }

  image: File | null = null;
  imageMin: File | null = null;
  images: any[] = [];
  formData = new FormData();

  onUpload(): void {
    if (this.image) {
      this.fileService.upload(this.image).subscribe(
        (data) => {
          this.userInfo.AVATAR = data.url;
        },
        (err) => {}
      );
    }
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    this.formData.append('file', file);
  }

  onFileChange(event: any) {
    this.image = event.target.files[0];
    this.imageMin = null;
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imageMin = evento.target.result;
    };
    if (this.image) {
      fr.readAsDataURL(this.image);
    }
    this.onUpload();
  }

  createNotification(message: string, type: string): void {
    this.notification.create(type, '', message).onClick.subscribe(() => {
      console.log('notification clicked!');
    });
  }
}
