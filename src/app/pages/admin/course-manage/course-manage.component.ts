import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject } from 'rxjs';
import { CourseService } from 'src/app/service/course-service/course.service';
import { UploadService } from 'src/app/service/upload-service/upload.service';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-course-manage',
  templateUrl: './course-manage.component.html',
  styleUrls: ['./course-manage.component.less'],
})
export class CourseManageComponent {
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
  searchValueSubject = '';
  aa: boolean = false;

  userRole = null;
  date = [];
  isVisible = false;
  isVisibleUpdate = false;
  comfirmText = 'Xác nhận chỉnh sửa';
  courseInfo: any;
  courseInfoOld: any;
  listProvinces: any;
  filteredProvinces: any[] = [];
  files = [];
  priceEnd: number = null;
  priceStart: number = null;
  courseType: any;
  courseStatus: any;
  checkStatus: any;

  constructor(
    private mess: NzMessageService,
    private userService: UserService,
    private courseService: CourseService,
    private modal: NzModalService,
    private fileService: UploadService,
    private notification: NzNotificationService,
    public router: Router,
  ) {}

  ngOnInit(): void {
    this.getAllCourseAPI();
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
    this.courseService.userGetDetailCourse(data.ID_COURSE).subscribe((res) => {
      if (res.success) {
        this.courseInfo = res.data;
        this.courseInfoOld = res.data;
        this.files = res.data.DOCUMENTS_INFO;
      } else {
      }
    });
  }

  handleEditOk() {
    this.isVisibleUpdate = false;
  }

  handleEditCancel(): void {
    this.isVisibleUpdate = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getCourseType(type: number): string {
    switch (type) {
      case 0:
        return 'Cơ bản';
      case 1:
        return 'Nâng cao';
      case 2:
        return 'Luyện đề';
      default:
        return 'Unknown';
    }
  }

  getAllCourseAPI() {
    this.listOfData = [];
    this.courseService.getAllCourse().subscribe((res: any) => {
      if (res.success) {
        res.data.forEach((element) => {
          let item = {
            ID_COURSE: element.ID_COURSE,
            AVATAR_COURSE: element.AVATAR_COURSE,
            CATEGORY_NAME: element.CATEGORY_NAME,
            COURSE_NAME: element.COURSE_NAME,
            USERNAME: element.USERNAME,
            DISCOUNT: element.DISCOUNT,
            PRICE: element.PRICE,
            END_DATE: element.END_DATE,
            ID_TEACHER: element.ID_TEACHER,
            LESSON_INFO: element.LESSON_INFO,
            LESSON_QUANTITY: element.LESSON_QUANTITY,
            QUIZ_QUANTITY: element.QUIZ_QUANTITY,
            REVIEW: element.REVIEW,
            SCHEDULE: element.SCHEDULE,
            START_DATE: element.START_DATE,
            TEACHER_INFO: element.TEACHER_INFO,
            TYPE_COURSE: element.TYPE_COURSE,
            ACTIVE: element.ACTIVE,
            IS_CHECK: element.IS_CHECK,
          };
          this.listOfData.push(item);
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

  getCourseDetail(item: any) {
    this.courseService.idCourse = Number(item);
    localStorage.setItem('idCourse', item);
    this.router.navigateByUrl('/admin/course-detail');
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
          (item.COURSE_NAME &&
            item.COURSE_NAME.toLowerCase().indexOf(searchValueLower) > -1) ||
          (item.TEACHER_INFO.USERNAME &&
            item.TEACHER_INFO.USERNAME.toLowerCase().indexOf(searchValueLower) >
              -1) ||
          (item.CATEGORY_NAME &&
            item.CATEGORY_NAME.toLowerCase().indexOf(searchValueLower) > -1)
        );
      });
    }

    if (this.courseType != null && this.courseType != 'Tất cả') {
      this.listOfDisplayData = this.listOfDisplayData.filter(
        (item: any) => item.TYPE_COURSE == this.courseType
      );
    }

    if (this.priceStart && this.priceEnd) {
      this.listOfDisplayData = this.listOfDisplayData.filter(
        (item: any) =>
          Number(item.DISCOUNT) <= Number(this.priceEnd) && Number(item.DISCOUNT) >= this.priceStart
      );
    }

    if (this.priceStart && !this.priceEnd) {
      this.listOfDisplayData = this.listOfDisplayData.filter(
        (item: any) => Number(item.DISCOUNT) >= Number(this.priceStart)
      );
    }

    if (!this.priceStart && this.priceEnd) {
      this.listOfDisplayData = this.listOfDisplayData.filter(
        (item: any) => Number(item.DISCOUNT) <= Number(this.priceEnd)
      );
    }

    if (this.courseStatus != null && this.courseStatus != 'Tất cả') {
      this.listOfDisplayData = this.listOfDisplayData.filter(
        (item: any) => item.ACTIVE == this.courseStatus
      );
    } 

    if (this.checkStatus != null && this.checkStatus != 'Tất cả') {
      this.listOfDisplayData = this.listOfDisplayData.filter(
        (item: any) => item.IS_CHECK == this.checkStatus
      );
    } 
  }

  resetValueSelected() {
    this.courseType = null;
    this.checkStatus = null;
    this.courseStatus = null;
    this.priceEnd = null;
    this.priceStart = null;
    this.userRole = null;
    this.searchValue = '';
    this.searchValueSubject = '';
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
          this.courseInfo.AVATAR = data.url;
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
