import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { formatDistance } from 'date-fns';
import { vi } from 'date-fns/locale';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CourseService } from 'src/app/service/course-service/course.service';
import { UploadService } from 'src/app/service/upload-service/upload.service';

@Component({
  selector: 'app-learning-course',
  templateUrl: './learning-course.component.html',
  styleUrls: ['./learning-course.component.less'],
})
export class LearningCourseComponent implements OnInit {
  role = localStorage.getItem('role');
  idUser = localStorage.getItem('user_id');
  userAvatar = localStorage.getItem('avatar');
  idLeson: number;
  idCourse: number;
  detailLesson: any;
  isLoadingReview = false;
  takeNote: any;
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount',
    menubar: false,
  };
  isVisible = false;
  deleteItem: any;
  activeTab = 1;
  panels = [];
  ratings = [];
  files = [];
  quizs = [
    {
      name: 'Bài tập về Căn thức',
      isFinish: true,
    },
    {
      name: 'Bài tập về Căn thức',
      isFinish: false,
    },
    {
      name: 'Bài tập về Căn thức',
      isFinish: false,
    },
  ];

  data: any[] = [];
  submitting = false;
  user = {
    author: 'Hà Trang',
    avatar: 'https://cdn-icons-png.flaticon.com/512/1993/1993167.png',
  };

  inputValue = '';
  courseDetail: any;

  constructor(
    private courseService: CourseService,
    private notification: NzNotificationService,
    public router: Router,
    private fileService: UploadService
  ) {}

  ngOnInit(): void {
    this.idLeson = this.courseService.idLesson;
    this.idCourse = this.courseService.idCourse;
    if (!this.idLeson || !this.idCourse) {
      this.idCourse = Number(localStorage.getItem('idCourse'));
      this.idLeson = Number(localStorage.getItem('idLesson'));
    }
    this.initCourseDetails();
    this.userGetLessonDetail();
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

  userGetLessonDetail() {
    this.courseService.userGetLessonDetail(this.idLeson).subscribe((res) => {
      if (res.success) {
        this.detailLesson = res.data;
        this.files = res.data.DOCUMENTS_INFO;
      }
      else {        
      }
    })
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

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';
    setTimeout(() => {
      this.submitting = false;
      this.data = [
        ...this.data,
        {
          ...this.user,
          content,
          datetime: new Date(),
          displayTime: formatDistance(new Date(), new Date(), {locale: vi}),
        },
      ].map((e) => ({
        ...e,
        displayTime: formatDistance(new Date(), e.datetime, {locale: vi}),
      }));
    }, 800);
  }

  getComments() {
    this.isLoadingReview = true;
    this.courseService.userGetListComment(this.idLeson).subscribe((res) => {
      if (res.success && res.data) {
        this.ratings = res.data;
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
          this.getComments();
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
        this.getComments();
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
          this.getComments();
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
        this.getComments();
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

  createNotification(message: string, type: string): void {
    this.notification.create(type, '', message).onClick.subscribe(() => {
      console.log('notification clicked!');
    });
  }

  onTabChange(index: number) {
    this.activeTab = index + 1;
  }

  openModal(item: any) {
    this.deleteItem = item;
    this.isVisible = true;
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

  onPause(video: HTMLVideoElement): void {
    const currentTime = video.currentTime; // Lấy thời gian hiện tại tính bằng giây
    localStorage.setItem('pauseTime', currentTime.toString());
    console.log(currentTime);
  }

  onLoadedMetadata(video: HTMLVideoElement): void {
    const pausedTime = localStorage.getItem('pausedTime'); // Lấy thời gian tạm dừng từ localStorage
    if (pausedTime) {
      video.currentTime = parseFloat(pausedTime); // Thiết lập thời gian bắt đầu của video
    }
  }
}
