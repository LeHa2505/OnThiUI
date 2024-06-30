import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDistance } from 'date-fns';
import { el, vi } from 'date-fns/locale';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CourseService } from 'src/app/service/course-service/course.service';
import { UploadService } from 'src/app/service/upload-service/upload.service';
import { UserService } from 'src/app/service/user-service/user.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.less'],
})
export class EditCourseComponent {
  activeTab = 1;
  idCourse: number;
  role = localStorage.getItem('role');
  idUser = localStorage.getItem('user_id');
  userAvatar = localStorage.getItem('avatar');
  isLoadingReview = false;
  isLiked = false;
  isDisliked = false;
  userComment: string;
  courseDetail: any;
  submitting = false;
  isVisible = false;
  deleteItem: any;
  filenames: string[] = [];
  formData = new FormData();
  fileStatus = { status: '', requestType: '', percent: 0 };
  isLearning = false;
  isStarted = false;
  learnedLessons = [];
  learningLeson: any;
  notifications: any;
  public sanitizedContent: SafeHtml;
  editFormVisible = false;
  editTitle = 'Chỉnh sửa thông tin khóa học';
  panels = [];

  ratings = [];
  average: number = 0;
  percent1Star: any = 0;
  percent2Star: any = 0;
  percent3Star: any = 0;
  percent4Star: any = 0;
  percent5Star: any = 0;
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount',
    menubar: false,
    toolbar:
      'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
  };
  formatProgress = (percent: number): string => `${percent}%`;
  validateForm: FormGroup;
  categoryList: any;
  courseTypeList: any;
  comments = [];
  listClass: any[] = [];
  files = [];
  disabled = true;
  private stompClient = null;
  newmessage: string;
  comfirmText = 'Xác nhận chỉnh sửa';
  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private userService: UserService,
    public router: Router,
    private fileService: UploadService,
    private modal: NzModalService,
    private sanitizer: DomSanitizer
  ) {
    this.validateForm = this.fb.group(
      {
        ID_COURSE: [this.idCourse],
        ACTIVE: [null],
        IS_SUBMITTED: [null],
        IS_CHECK: [null],
        COURSE_NAME: [null, [Validators.required]],
        DESCRIPTION: [null, [Validators.required]],
        CATEGORY_NAME: ['', [Validators.required]],
        ID_TEACHER: [this.idUser],
        PRICE: [null, [Validators.required]],
        DISCOUNT: [null, [Validators.required]],
        TYPE_COURSE: [null, [Validators.required]],
        AVATAR_COURSE: [this.courseAvatar, [Validators.required]],
        START_DATE: [null],
        END_DATE: [null],
        DATE: [null],
      },
      { validators: this.discountLessThanPrice }
    );
  }

  ngOnInit(): void {
    this.idCourse = this.courseService.idCourse;
    if (!this.idCourse) {
      this.idCourse = Number(localStorage.getItem('idCourse'));
    }
    this.userInitCourseDetails();
    this.initCategoryList();
    this.initCourseTypeList();
  }

  initCategoryList() {
    this.categoryList = [
      { label: 'Toán học', value: 'Toán' },
      { label: 'Ngữ văn', value: 'Ngữ văn' },
      { label: 'Hóa học', value: 'Hóa học' },
      { label: 'Vật lý', value: 'Vật lý' },
      { label: 'Sinh học', value: 'Sinh học' },
      { label: 'Địa lý', value: 'Địa lý' },
      { label: 'Lịch sử', value: 'Lịch sử' },
      { label: 'Tiếng Anh', value: 'Tiếng anh' },
      { label: 'Tiếng Nhật', value: 'Tiếng nhật' },
      { label: 'Tiếng Trung', value: 'Tiếng trung' },
      { label: 'Tiếng Pháp', value: 'Tiếng pháp' },
      {
        label: 'Giáo dục công dân',
        value: 'GDCD',
      },
    ];
  }

  initCourseTypeList() {
    this.courseTypeList = [
      { label: 'Khóa cơ bản', value: 0 },
      { label: 'Khóa nâng cao', value: 1 },
      { label: 'Luyện đề theo tỉnh thành', value: 2 },
    ];
  }

  discountLessThanPrice(control: AbstractControl): ValidationErrors | null {
    const price = control.get('PRICE').value;
    const discount = control.get('DISCOUNT').value;
    return discount > price ? { discountGreaterThanPrice: true } : null;
  }

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
    this.validateForm.patchValue({
      START_DATE: result[0],
      END_DATE: result[1],
    });
  }

  submitForm(): void {
    console.log('Form Submitted', this.validateForm.value);
    if (this.validateForm.valid) {
      this.editFormVisible = false;
      this.courseService
        .updateCourse(this.validateForm.value)
        .subscribe((res) => {
          if (res.success) {
            this.userInitCourseDetails();
            this.createNotification(res.message, 'success');
          } else {
            this.createNotification(res.message, 'error');
          }
        });
      // Handle form submission logic
      // this.courseService.teacherAddCourse();
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
          this.createNotification(
            'Vui lòng xem lại thông tin khóa học!',
            'error'
          );
        }
      });
    }
  }

  image: File | null = null;
  video: File | null = null;
  imageMin: File | null = null;
  images: any[] = [];
  courseAvatar: any;
  videoCourse: any;
  amountVideo: any;

  handleEditCancel() {
    this.editFormVisible = false;
  }

  handleEditOk() {
    this.submitForm();
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;
    if (connected) {
    }
  }

  connect() {
    const socket = new SockJS('http://localhost:8899/chat');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame) {
      _this.setConnected(true);
      _this.stompClient.subscribe(
        '/send/notifications',
        function (notification) {
          _this.handleNewNotification(JSON.parse(notification.body));
        }
      );
    });
  }

  handleNewNotification(notification) {
    this.notifications.push(notification);
    // Cập nhật giao diện người dùng nếu cần thiết
  }

  initNotification() {
    this.userService.getListNotification(this.idUser).subscribe((res) => {
      if (res.success) {
        this.notifications = res.data;
      }
    });
  }

  sendMessage() {
    this.stompClient.send(
      '/app/sendNotification', // Cập nhật endpoint theo yêu cầu backend của bạn
      {},
      JSON.stringify(this.newmessage)
    );
    this.newmessage = '';
  }

  async initListClass(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.userService.getListCourses(this.idUser).subscribe(
        (res) => {
          if (res.success) {
            this.listClass = res.data;
            resolve();
          } else {
            reject('Failed to load courses');
          }
        },
        (error) => reject(error)
      );
    });
  }

  async checkAcessToCourse() {
    try {
      await this.initListClass();
      const foundItem = this.listClass.find(
        (item) => item.ID_COURSE == this.idCourse
      );
      this.isLearning = true;
      this.learningLeson = foundItem.LEARNING_LESSON;
      if (foundItem.LEARNED_LESSON) {
        this.getLearnedLessonArray(foundItem.LEARNED_LESSON);
        this.isStarted = true;
      } else this.isStarted = false;
      this.userInitCourseDetails();
    } catch (error) {
      console.error('Error initializing list class:', error);
    }
  }

  async guestInitCourseDetails() {
    await this.guestGetDetailCourseApi();
  }

  async userInitCourseDetails() {
    await this.userGetDetailCourseApi();
  }

  async guestGetDetailCourseApi() {
    return new Promise<void>((resolve, reject) => {
      this.courseService.guestGetDetailCourse(this.idCourse).subscribe(
        (res) => {
          if (res.success) {
            this.courseDetail = res.data;
            this.ratings = res.data.REVIEW;
            this.guestMapLessonsToPanels(res.data.LESSON_INFO);

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

  async userGetDetailCourseApi() {
    return new Promise<void>((resolve, reject) => {
      this.courseService.adminGetDetailCourse(this.idCourse).subscribe(
        (res) => {
          if (res.success) {
            this.courseDetail = res.data;
            this.ratings = res.data.REVIEW;
            this.userMapLessonsToPanels(res.data.LESSON_INFO);
            this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(
              this.courseDetail.DESCRIPTION
            );

            const dateArray = [];
            dateArray.push(this.courseDetail.START_DATE);
            dateArray.push(this.courseDetail.END_DATE);

            this.courseAvatar = this.courseDetail.AVATAR_COURSE;
            this.validateForm.patchValue({
              ID_COURSE: this.idCourse,
              ACTIVE: this.courseDetail.ACTIVE,
              IS_CHECK: this.courseDetail.IS_CHECK,
              IS_SUBMITTED: this.courseDetail.IS_SUBMITTED,
              COURSE_NAME: this.courseDetail.COURSE_NAME,
              DESCRIPTION: this.courseDetail.DESCRIPTION,
              CATEGORY_NAME: this.courseDetail.CATEGORY_NAME,
              ID_TEACHER: this.courseDetail.ID_TEACHER,
              PRICE: this.courseDetail.PRICE,
              DISCOUNT: this.courseDetail.DISCOUNT,
              TYPE_COURSE: this.courseDetail.TYPE_COURSE,
              AVATAR_COURSE: this.courseDetail.AVATAR_COURSE,
              START_DATE: new Date(this.courseDetail.START_DATE),
              END_DATE: new Date(this.courseDetail.END_DATE),
              DATE: dateArray,
            });

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

  requestSubmitCourse() {
    this.modal.confirm({
      nzTitle:
        '<i>Bạn có muốn yêu cầu Quản trị viên MỞ khóa học này không?</i>',
      nzContent: '',
      nzOnOk: () => {
        this.courseService.submitCourse(this.idCourse).subscribe((res) => {
          if (res.success) {
            this.userInitCourseDetails();
            this.createNotification(res.message, 'success');
          } else {
            this.createNotification(res.message, 'error');
          }
        });
      },
    });
  }

  requestUnSubmitCourse() {
    this.modal.confirm({
      nzTitle:
        '<i>Bạn có muốn hủy yêu cầu mở khóa học này không?</i>',
      nzContent: '',
      nzOnOk: () => {
        this.courseService.unSubmitCourse(this.idCourse).subscribe((res) => {
          if (res.success) {
            this.userInitCourseDetails();
            this.createNotification(res.message, 'success');
          } else {
            this.createNotification(res.message, 'error');
          }
        });
      },
    });
  }

  calculateRatings() {
    this.average = 0;
    this.percent1Star = 0;
    this.percent2Star = 0;
    this.percent3Star = 0;
    this.percent4Star = 0;
    this.percent5Star = 0;
    let count = 0;

    this.ratings.forEach((item) => {
      if (item.RATING) {
        count++;
        let rating = Number(item.RATING);
        this.average = this.average + Number(rating);
        if (rating == 1) {
          this.percent1Star++;
        }
        if (rating == 2) {
          this.percent2Star++;
        }
        if (rating == 3) {
          this.percent3Star++;
        }
        if (rating == 4) {
          this.percent4Star++;
        }
        if (rating == 5) {
          this.percent5Star++;
        }
      }
    });

    // Chuyển đổi các phần trăm về số
    this.percent1Star = Number(this.percent1Star);
    this.percent2Star = Number(this.percent2Star);
    this.percent3Star = Number(this.percent3Star);
    this.percent4Star = Number(this.percent4Star);
    this.percent5Star = Number(this.percent5Star);

    this.percent1Star = (
      (this.percent1Star / this.ratings.length) *
      100
    ).toFixed(2);
    this.percent2Star = (
      (this.percent2Star / this.ratings.length) *
      100
    ).toFixed(2);
    this.percent3Star = (
      (this.percent3Star / this.ratings.length) *
      100
    ).toFixed(2);
    this.percent4Star = (
      (this.percent4Star / this.ratings.length) *
      100
    ).toFixed(2);
    this.percent5Star = (
      100 -
      this.percent1Star -
      this.percent2Star -
      this.percent3Star -
      this.percent4Star
    ).toFixed(2);

    // Tính lại percent5Star để đảm bảo tổng là 100%
    this.average = Number(this.average / count);
  }

  formatDate(dateString): any {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
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

  reviews() {
    this.isLoadingReview = true;
    this.courseService.userGetListReview(this.idCourse).subscribe((res) => {
      if (res.success && res.data) {
        this.ratings = res.data;
        this.calculateRatings();
        this.isLoadingReview = false;
      } else this.ratings = [];
      this.isLoadingReview = false;
    });
  }

  async like(reviews: any): Promise<void> {
    const hasUserWithIdUser = reviews.USER_INTERACT_LIST.find(
      (review) => review.ID_USER == Number(this.idUser)
    );
    if (hasUserWithIdUser) {
      if (hasUserWithIdUser.ACTION == 1) {
        reviews.LIKE = Number(reviews.LIKE) - 1;
        reviews.ID_USER_INTERACT = this.idUser;
        try {
          const res = await this.courseService
            .userUnlikeUndislikeReview(reviews)
            .toPromise();
          this.reviews();
        } catch (error) {
          console.error(error);
        }
      } else {
        this.createNotification(
          'Bạn không thể thao tác do đã like hoặc dislike bình luận rồi!',
          'warning'
        );
        return;
      }
    } else {
      reviews.LIKE = Number(reviews.LIKE) + 1;
      reviews.ID_USER_INTERACT = this.idUser;
      reviews.USER_INTERACT_ACTION = 1;
      try {
        const res = await this.courseService
          .userLikeDislikeReview(reviews)
          .toPromise();
        // this.updateReviewLikesDislikes(
        //   reviews.ID_REVIEW,
        //   reviews.LIKE,
        //   reviews.DISLIKE
        // );
        // this.checkDislike(reviews);
        this.reviews();
      } catch (error) {
        console.error(error);
      }
    }
  }

  async dislike(reviews: any): Promise<void> {
    const hasUserWithIdUser = reviews.USER_INTERACT_LIST.find(
      (review) => review.ID_USER == Number(this.idUser)
    );
    if (hasUserWithIdUser) {
      if (hasUserWithIdUser.ACTION == 0) {
        reviews.DISLIKE = Number(reviews.DISLIKE) - 1;
        reviews.ID_USER_INTERACT = this.idUser;
        try {
          const res = await this.courseService
            .userUnlikeUndislikeReview(reviews)
            .toPromise();
          //
          this.reviews();
        } catch (error) {
          console.error(error);
        }
      } else {
        this.createNotification(
          'Bạn không thể thao tác do đã like hoặc dislike bình luận rồi!',
          'warning'
        );
        return;
      }
    } else {
      reviews.DISLIKE = Number(reviews.DISLIKE) + 1;
      reviews.ID_USER_INTERACT = this.idUser;
      reviews.USER_INTERACT_ACTION = 0;
      try {
        const res = await this.courseService
          .userLikeDislikeReview(reviews)
          .toPromise();
        // this.updateReviewLikesDislikes(
        //   reviews.ID_REVIEW,
        //   reviews.LIKE,
        //   reviews.DISLIKE
        // );
        this.reviews();
      } catch (error) {
        console.error(error);
      }
    }
  }

  updateReviewLikesDislikes(
    reviewId: number,
    newLike: number,
    newDislike: number
  ): void {
    this.ratings = this.ratings.map((review) => {
      if (review.ID_REVIEW === reviewId) {
        return {
          ...review,
          LIKE: newLike,
          DISLIKE: newDislike,
        };
      }
      return review;
    });
  }

  checkLike(item: any) {
    if (item.USER_INTERACT_LIST) {
      const hasUserWithIdUser = item.USER_INTERACT_LIST.find(
        (review) => review.ID_USER == Number(this.idUser)
      );
      if (hasUserWithIdUser && hasUserWithIdUser.ACTION == 1) {
        return true;
      } else return false;
    } else return false;
  }

  checkDislike(item: any) {
    if (item.USER_INTERACT_LIST) {
      const hasUserWithIdUser = item.USER_INTERACT_LIST.find(
        (review) => review.ID_USER == Number(this.idUser)
      );
      if (hasUserWithIdUser && hasUserWithIdUser.ACTION == 0) {
        return true;
      } else return false;
    } else return false;
  }

  onTabChange(index: number) {
    this.activeTab = index + 1;
  }

  handleSubmit() {
    this.submitting = true;
    const newReview = {
      ID_COURSE: Number(localStorage.getItem('idCourse')),
      ID_USER: this.idUser,
      CONTENT: this.userComment,
      RATING: null,
      LIKE: 0,
      DISLIKE: 0,
      CREATED_DATE: new Date(),
      ID_USER_INTERACT: null,
      USER_INTERACT_ACTION: null,
      USER_INFO: {
        AVATAR: this.userAvatar,
        USERNAME: localStorage.getItem('username'),
      },
    };

    const content = this.userComment;
    this.userComment = '';

    this.courseService.createReview(newReview).subscribe((res) => {
      if (res.success) {
        this.createNotification(res.message, 'success');
        this.ratings.push(newReview);
        this.submitting = false;
        this.reviews();
      } else {
        this.createNotification(res.message, 'error');
        this.submitting = false;
      }
    });
  }

  createNotification(message: string, type: string): void {
    this.notification.create(type, '', message).onClick.subscribe(() => {});
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    this.courseService
      .deleteReview(this.deleteItem.ID_REVIEW)
      .subscribe((res) => {
        if (res.success) {
          this.ratings = this.ratings.filter(
            (item) => item.ID_REVIEW !== this.deleteItem.ID_REVIEW
          );
          this.createNotification(res.message, 'success');
        } else {
          this.createNotification(res.message, 'error');
        }
      });
    this.isVisible = false;
  }

  openModal(item: any) {
    this.deleteItem = item;
    this.isVisible = true;
  }

  editCourse() {
    this.editFormVisible = true;
  }

  onUpload(): void {
    this.courseAvatar = null;
    if (this.image) {
      this.fileService.upload(this.image).subscribe(
        (data) => {
          this.courseAvatar = data.url;
          this.validateForm.patchValue({
            AVATAR_COURSE: this.courseAvatar,
          });
          console.log(this.validateForm.value.AVATAR_COURSE);
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

  userMapLessonsToPanels = (lessons) => {
    this.panels = [];
    lessons.sort((a, b) => a.ORDER - b.ORDER);

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
              order: Number(item.ORDER),
              time: item.DURATION,
              lesson: listChild,
              disabled: false,
            };
            listChild.push(child);
          }
        });

        listChild.sort((a, b) => a.order - b.order);

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
          order: Number(lesson.ORDER),
          time: time,
          lesson: listChild,
          disabled: false,
        };
        this.panels.push(newPanel);
      }
    });
  };

  guestMapLessonsToPanels = (lessons) => {
    // Initialize an empty array to hold the panels
    this.panels = [];

    // Sort the lessons array by the 'order' property in ascending order
    lessons.sort((a, b) => a.ORDER - b.ORDER);

    let panelCount = 0; // Initialize a counter for panels

    for (const lesson of lessons) {
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
              order: Number(item.ORDER),
              time: item.DURATION,
              lesson: listChild,
              disabled: false,
            };
            listChild.push(child);
          }
        });

        // Sort the listChild array by the 'order' property in ascending order
        listChild.sort((a, b) => a.order - b.order);

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
          order: Number(lesson.ORDER),
          time: time,
          lesson: listChild,
          disabled: false,
        };
        this.panels.push(newPanel);
        panelCount++; // Increment the counter

        if (panelCount === 5) {
          break; // Stop processing once 5 panels have been added
        }
      }
    }
  };

  learning(item: any) {
    this.courseService.idLesson = Number(item.id);
    this.courseDetail.idCourse = this.idCourse;
    localStorage.setItem('idCourse', this.idCourse.toString());
    localStorage.setItem('idLesson', item.id);
    this.router.navigateByUrl(`/admin/lesson-detail/${item.name}`);
  }

  learnTry(item: any) {
    this.courseService.idLesson = Number(item.ID_LESSON);
    this.courseDetail.idCourse = this.idCourse;
    localStorage.setItem('idCourse', this.idCourse.toString());
    localStorage.setItem('idLesson', item.ID_LESSON);
    this.router.navigateByUrl(`/courses/learning/${item.LESSON_NAME}`);
  }

  buyCourse() {
    this.courseDetail.idCourse = this.idCourse;
    localStorage.setItem('idCourse', this.idCourse.toString());
    this.router.navigateByUrl(`/courses/buy`);
  }

  getLearnedLessonArray(learnedLesson: string) {
    this.learnedLessons = learnedLesson.split(',').map((id) => Number(id));
  }

  continueLearn() {
    this.courseService.idLesson = Number(this.learningLeson);
    this.courseDetail.idCourse = this.idCourse;
    localStorage.setItem('idCourse', this.idCourse.toString());
    localStorage.setItem('idLesson', this.learningLeson);
    this.courseService
      .userGetLessonDetail(this.learningLeson)
      .subscribe((res) => {
        if (res.success) {
          this.router.navigateByUrl(
            `/courses/learning/${res.data.LESSON_NAME}`
          );
        } else {
          this.createNotification('Có lỗi xảy ra', 'error');
        }
      });
  }
}
