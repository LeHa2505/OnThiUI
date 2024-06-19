import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject } from 'rxjs';
import { CourseService } from 'src/app/service/course-service/course.service';
import { UploadService } from 'src/app/service/upload-service/upload.service';
import { UserService } from 'src/app/service/user-service/user.service';
// import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-student-manager',
  templateUrl: './student-manager.component.html',
  styleUrls: ['./student-manager.component.less'],
})
export class StudentManagerComponent {
  role = localStorage.getItem('role');
  idUser = localStorage.getItem('user_id');
  userAvatar = localStorage.getItem('avatar');
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
  listCourses = null;
  courseFilter: any;

  constructor(
    private mess: NzMessageService,
    private userService: UserService,
    private modal: NzModalService,
    private fileService: UploadService,
    private notification: NzNotificationService,
    private couserService: CourseService
  ) {}

  ngOnInit(): void {
    this.getAllUserAPI();
    this.initProvinces();
    this.getListCoursesByInputConditionAPI();
  }

  getListCoursesByInputConditionAPI() {
    this.couserService
      .getListCoursesByInputCondition({
        ID_USER: this.idUser,
      })
      .subscribe((res) => {
        this.listCourses = res.data;
      });
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
    this.couserService
      .getStudentsByTeacherId(this.idUser)
      .subscribe((res: any) => {
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
              COURSE_NAME: element.COURSE_NAME,
              ID_COURSE: element.ID_COURSE,
            };
            if (element.TYPE_USER != 0) {
              this.listOfData.push(item);
            }
          });
          this.listOfDisplayData = [...this.listOfData];
          this.filterUniqueUsers();
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

  filterUniqueUsers() {
    const uniqueUsers = new Set();
    this.listOfDisplayData = this.listOfData.filter((item) => {
      if (!uniqueUsers.has(item.ID_USER)) {
        uniqueUsers.add(item.ID_USER);
        return true;
      }
      return false;
    });
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

    if (this.courseFilter != null && this.courseFilter != 'Tất cả') {
      this.listOfDisplayData = this.listOfDisplayData.filter(
        (item: any) => item.COURSE_NAME == this.courseFilter
      );
    }

    if (
      this.courseFilter == 'Tất cả' ||
      (!this.searchValue && this.courseFilter == null)
    ) {
      this.filterUniqueUsers();
    }
  }

  resetValueSelected() {
    this.active = null;
    this.courseFilter = null;
    this.gender = null;
    this.userRole = null;
    this.searchValue = '';
    this.search();
    this.filterUniqueUsers();
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
    this.notification.create(type, '', message).onClick.subscribe(() => {});
  }
}
