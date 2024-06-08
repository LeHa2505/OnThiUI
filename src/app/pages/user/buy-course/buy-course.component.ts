import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CourseService } from 'src/app/service/course-service/course.service';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-buy-course',
  templateUrl: './buy-course.component.html',
  styleUrls: ['./buy-course.component.less'],
})
export class BuyCourseComponent implements OnInit {
  idCourse: number;
  role = localStorage.getItem('role');
  idUser = localStorage.getItem('user_id');
  avatar = localStorage.getItem('avatar');
  username = localStorage.getItem('username');
  email = localStorage.getItem('email');
  courseDetail: any;
  files = [];
  ratings = [];
  panels = [];
  today = new Date();
  isVisible = false;
  phoneNumber = localStorage.getItem('phone');
  address = localStorage.getItem('address');

  constructor(
    private courseService: CourseService,
    private notification: NzNotificationService,
    private userService: UserService,
    public router: Router,
    private fb: NonNullableFormBuilder
  ) {
    this.validateForm = this.fb.group({
      email: [this.email, [Validators.email, Validators.required]],
      name: [this.username, [Validators.required]],
      phoneNumberPrefix: '+84',
      phoneNumber: [this.phoneNumber, [Validators.required]],
      address: [this.address, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.idCourse = this.courseService.idCourse;
    if (!this.idCourse) {
      this.idCourse = Number(localStorage.getItem('idCourse'));
    }
    this.guestInitCourseDetails();
  }

  async guestInitCourseDetails() {
    await this.guestGetDetailCourseApi();
  }

  async guestGetDetailCourseApi() {
    return new Promise<void>((resolve, reject) => {
      this.courseService.guestGetDetailCourse(this.idCourse).subscribe(
        (res) => {
          if (res.success) {
            this.courseDetail = res.data;
            this.ratings = res.data.REVIEW;
            this.mapLessonsToPanels(res.data.LESSON_INFO);
            console.log(this.panels);

            res.data.LESSON_INFO.forEach((item) => {
              this.files.push(...item.DOCUMENTS_INFO);
            });
            resolve();
          } else {
            this.router.navigateByUrl('/exception/404');
            reject(); // Reject the promise if there is an error
          }
        },
        (error) => {
          this.router.navigateByUrl('/exception/404');
          reject(); // Reject the promise if there is an error
        }
      );
    });
  }

  mapLessonsToPanels = (lessons) => {
    lessons.forEach((lesson) => {
      if (!lesson.LESSON_PARENT) {
        const listChild = [];
        lessons.forEach((item) => {
          if (item.LESSON_PARENT && item.LESSON_PARENT == lesson.ID_LESSON) {
            const child = {
              id: item.ID_LESSON,
              video: item.LINK_VIDEO,
              subject: item.SUBJECT,
              continueTime: item.CONTINUE_TIME,
              view: item.VIEW,
              descrip: item.DESCRIPTION,
              active: false,
              name: item.LESSON_NAME,
              time: item.DURATION,
              lesson: listChild,
              disabled: false,
            };
            listChild.push(child);
          }
        });
        let time = 0;
        listChild.forEach((child) => {
          time = time + Number(child.time);
        });
        const newPanel = {
          id: lesson.ID_LESSON,
          video: lesson.LINK_VIDEO,
          subject: lesson.SUBJECT,
          continueTime: lesson.CONTINUE_TIME,
          view: lesson.VIEW,
          descrip: lesson.DESCRIPTION,
          active: false,
          name: lesson.LESSON_NAME,
          time: time,
          lesson: listChild,
          disabled: false,
        };
        this.panels.push(newPanel);
      }
    });
  };

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.submitForm();
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  validateForm: FormGroup<{
    email: FormControl<string>;
    name: FormControl<string>;
    phoneNumberPrefix: FormControl<'+84'>;
    phoneNumber: FormControl<string>;
    address: FormControl<string>;
  }>;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.isVisible = false;
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  confirmationValidator: ValidatorFn = (
    control: AbstractControl
  ): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    }
    return {};
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  getCategoryNameColor(type: string): string {
    const categoryName = type.toLowerCase();
    switch (categoryName) {
      case 'toán':
        return 'red';
      case 'ngữ văn':
        return 'geekblue';
      case 'hóa học':
        return 'orange';
      case 'vật lý':
        return 'gold';
      case 'sinh học':
        return 'volcano';
      case 'địa lý':
        return 'lime';
      case 'lịch sử':
        return 'purple';
      case 'tiếng pháp':
        return 'volcano';
      case 'tiếng trung':
        return 'gold';
      case 'tiếng nhật':
        return 'geekblue';
      case 'tiếng anh':
        return 'lime';
      case 'gdcd':
        return 'purple';
      default:
        return '#A4DDDE';
    }
  }

  typeCourseToCode(type: string): number {
    switch (type) {
      case 'Khóa cơ bản':
        return 0;
      case 'Khóa nâng cao':
        return 1;
      case 'Luyện đề theo tỉnh thành':
        return 2;
      default:
        return null;
    }
  }

  getCourseTypeColor(type: number): string {
    switch (type) {
      case 0:
        return 'green';
      case 1:
        return 'magenta';
      case 2:
        return 'blue';
      default:
        return 'cyan';
    }
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

  calculateMonthsDifference(startDate: Date, endDate: Date): number {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const yearDiff = end.getFullYear() - start.getFullYear();
    const monthDiff = end.getMonth() - start.getMonth();
    const dayDiff = end.getDate() - start.getDate();

    let totalMonths = yearDiff * 12 + monthDiff;

    // If the end day is greater than the start day, add one more month to the total
    if (dayDiff > 0) {
      totalMonths += 1;
    }

    return totalMonths;
  }

  checkout() {
    if (this.validateForm.valid) {
      this.courseService
        .enrollCourse({
          ID_USER: this.idUser,
          ID_COURSE: this.idCourse,
          LEARNED_LESSON: '',
          LEARNING_LESSON: null,
        })
        .subscribe((res) => {
          if (res.success) {
            this.createNotification(res.message, 'success');
            this.courseService.idCourse = Number(this.idCourse);
            localStorage.setItem('idCourse', this.idCourse.toString());
            this.router.navigateByUrl('/courses/course-detail');
          }
          else {
            this.createNotification(res.message, 'error');
          }
        }
      );
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          console.log(control);
        }
      });
    }
    if (!this.address) {
      this.createNotification('Chưa có thông tin địa chỉ', 'error');
    }
    if (!this.phoneNumber) {
      this.createNotification('Chưa có thông tin số điện thoại', 'error');
    }
  }

  createNotification(message: string, type: string): void {
    this.notification.create(type, '', message).onClick.subscribe(() => {
      console.log('notification clicked!');
    });
  }
}
