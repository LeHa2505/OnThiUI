import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDistance } from 'date-fns';
import { el, vi } from 'date-fns/locale';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CourseService } from 'src/app/service/course-service/course.service';
import { UploadService } from 'src/app/service/upload-service/upload.service';

@Component({
  selector: 'app-detail-course',
  templateUrl: './detail-course.component.html',
  styleUrls: ['./detail-course.component.less'],
})
export class DetailCourseComponent implements OnInit {
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

  panels = [];

  ratings = [];
  average: number = 0;
  percent1Star: any = 0;
  percent2Star: any = 0;
  percent3Star: any = 0;
  percent4Star: any = 0;
  percent5Star: any = 0;

  formatProgress = (percent: number): string => `${percent}%`;

  comments = [];

  files = [];

  constructor(
    private courseService: CourseService,
    private notification: NzNotificationService,
    public router: Router,
    private fileService: UploadService
  ) {}

  ngOnInit(): void {
    this.idCourse = this.courseService.idCourse;
    if (!this.idCourse) {
      this.idCourse = Number(localStorage.getItem('idCourse'));
    }
    this.initCourseDetails();
  }

  async initCourseDetails() {
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
            })
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
      }
      else this.ratings = [];
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
    this.notification.create(type, '', message).onClick.subscribe(() => {
      console.log('notification clicked!');
    });
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

  image: File | null = null;
  imageMin: File | null = null;
  images: any[] = [];

  onUpload(): void {
    if (this.image) {
      this.fileService.upload(this.image).subscribe(
        data => {
          console.log(data);
        },
        err => {
        }
      );
    }
  }

  onFileSelected(event) {
    console.log(event);
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

  mapLessonsToPanels = (lessons) => {
    lessons.forEach(lesson => {
      if (!lesson.LESSON_PARENT) {
        const listChild = [];
        lessons.forEach((item) => {
          if (item.LESSON_PARENT && item.LESSON_PARENT==lesson.ID_LESSON) {
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
            listChild.push(child)
          }
        })
        let time = 0;
        listChild.forEach((child) => {
          time = time + Number(child.time);
        })
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
  }

  learning(item: any) {
    this.courseService.idLesson = Number(item.id);
    this.courseDetail.idCourse = this.idCourse;
    localStorage.setItem('idCourse', this.idCourse.toString());
    localStorage.setItem('idLesson', item.id);
    this.router.navigateByUrl(`/courses/learning/${item.name}`);
  }
}
