import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { formatDistance } from 'date-fns';
import { vi } from 'date-fns/locale';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CourseService } from 'src/app/service/course-service/course.service';
import { UploadService } from 'src/app/service/upload-service/upload.service';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-learning-course',
  templateUrl: './learning-course.component.html',
  styleUrls: ['./learning-course.component.less'],
})
export class LearningCourseComponent implements OnInit {
  role = localStorage.getItem('role');
  idUser = localStorage.getItem('user_id');
  userAvatar = localStorage.getItem('avatar');
  username = localStorage.getItem('username');
  idLeson: number;
  idCourse: number;
  detailLesson: any;
  isLoadingReview = false;
  takeNote: any = '';
  pauseMinutes: number;
  pauseSecond: number;
  pauseTime: number;
  idNote: number;
  isNoted = false;
  editorConfig = {
    base_url: '/tinymce',
    suffix: '.min',
    plugins: 'lists link image table wordcount',
    menubar: false,
    setup: (editor) => {
      editor.on('focus', () => {
        this.startEdit();
      });
    },
  };
  isVisible = false;
  deleteItem: any;
  activeTab = 1;
  panels = [];
  ratings = [];
  files = [];
  learnedLessons = [];
  quizs = [];

  data: any[] = [];
  submitting = false;
  user = {
    author: this.username,
    avatar: this.userAvatar,
  };
  isLoadingQuiz = false;

  inputValue = '';
  courseDetail: any;
  isLearned = false;
  listClass: any[] = [];
  isLearning = false;
  isStarted = false;
  userCourseDTO: any;
  @ViewChild('videoPlayer') videoPlayer: ElementRef<HTMLVideoElement>;

  constructor(
    private courseService: CourseService,
    private notification: NzNotificationService,
    public router: Router,
    private fileService: UploadService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.idLeson = Number(this.courseService.idLesson);
    this.idCourse = Number(this.courseService.idCourse);
    if (!this.idLeson || !this.idCourse) {
      this.idCourse = Number(localStorage.getItem('idCourse'));
      this.idLeson = Number(localStorage.getItem('idLesson'));
    }
    // this.initCourseDetails();
    this.checkAcessToCourse();
  }

  userGetLessonDetail() {
    this.courseService.userGetLessonDetail(this.idLeson).subscribe((res) => {
      if (res.success) {
        this.detailLesson = res.data;
        this.files = res.data.DOCUMENTS_INFO;
      } else {
      }
    });
  }

  async checkAcessToCourse() {
    try {
      await this.initListClass();
      const foundItem = this.listClass.find(
        (item) => item.ID_COURSE == this.idCourse
      );
      if (foundItem) {
        this.userCourseDTO = foundItem;
        this.isLearning = true;
        if (foundItem.LEARNED_LESSON) {
          this.getLearnedLessonArray(foundItem.LEARNED_LESSON);
          this.isLearned = this.checkIsLearned(
            this.learnedLessons,
            this.idLeson
          );
          this.isStarted = true;
        } else this.isStarted = false;
        this.userInitCourseDetails();
        this.userGetLessonDetail();
        this.userGetNoteAPI();
      } else {
        this.isLearning = false;
        this.guestInitCourseDetails();
      }
    } catch (error) {
      console.error('Error initializing list class:', error);
    }
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
      this.courseService.userGetDetailCourse(this.idCourse).subscribe(
        (res) => {
          if (res.success) {
            this.courseDetail = res.data;
            this.ratings = res.data.REVIEW;
            this.userMapLessonsToPanels(res.data.LESSON_INFO);

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

  userMapLessonsToPanels = (lessons) => {
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
              isLearned: this.checkIsLearned(
                this.learnedLessons,
                item.ID_LESSON
              ),
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
          displayTime: formatDistance(new Date(), new Date(), { locale: vi }),
        },
      ].map((e) => ({
        ...e,
        displayTime: formatDistance(new Date(), e.datetime, { locale: vi }),
      }));
    }, 800);
  }

  getComments() {
    this.isLoadingReview = true;
    this.courseService.userGetListComment(this.idLeson).subscribe((res) => {
      if (res.success && res.data) {
        this.ratings = res.data;
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
    this.pauseTime = 0;
    this.pauseTime = video.currentTime;
    this.pauseMinutes = Math.floor(Number(this.pauseTime) / 60); // Chuyển đổi sang phút
    this.pauseSecond = Math.floor(Number(this.pauseTime) % 60); // Lấy thời gian hiện tại tính bằng giây
    localStorage.setItem('pauseTime', this.pauseTime.toString());
  }

  onLoadedMetadata(video: HTMLVideoElement): void {
    const pausedTime = localStorage.getItem('pausedTime'); // Lấy thời gian tạm dừng từ localStorage
    if (pausedTime) {
      video.currentTime = parseFloat(pausedTime); // Thiết lập thời gian bắt đầu của video
    }
  }

  startEdit() {
    this.videoPlayer.nativeElement.pause();
    if (!this.pauseMinutes || !this.pauseSecond) {
      this.pauseMinutes = 0;
      this.pauseSecond = 0;
    }
    this.takeNote =
      this.takeNote +
      `<p>Thời gian ${this.pauseMinutes}m${this.pauseSecond}s: </p>`;
  }

  saveLearn() {
    this.courseService
      .updateLearningProcess({
        ID_USER_COURSE: this.userCourseDTO.ID_USER_COURSE,
        ID_USER: this.idUser,
        ID_COURSE: this.idCourse,
        LEARNING_LESSON: this.idLeson,
        LEARNED_LESSON: this.userCourseDTO.LEARNED_LESSON
          ? this.userCourseDTO.LEARNED_LESSON + `,${this.idLeson}`
          : `${this.idLeson}`,
      })
      .subscribe((res) => {
        if (res.success) {
          this.createNotification('Đánh dấu đã học thành công!', 'success');
          this.isLearned = !this.isLearned;
        } else {
          this.createNotification(res.message, 'error');
        }
      });
  }

  deleteLearn() {
    this.courseService
      .updateLearningProcess({
        ID_USER_COURSE: this.userCourseDTO.ID_USER_COURSE,
        ID_USER: this.idUser,
        ID_COURSE: this.idCourse,
        LEARNING_LESSON: this.idLeson,
        LEARNED_LESSON: this.removeNumberFromString(
          this.userCourseDTO.LEARNED_LESSON,
          this.idLeson
        ),
      })
      .subscribe((res) => {
        if (res.success) {
          this.createNotification('Đánh dấu thành chưa học!', 'success');
          this.isLearned = !this.isLearned;
        } else {
          this.createNotification(res.message, 'error');
        }
      });
  }

  removeNumberFromString(numberString: string, deleteNumber: number): string {
    return numberString
      .split(',')
      .filter((num) => Number(num) !== deleteNumber)
      .join(',');
  }

  learning(item: any) {
    this.courseService.idLesson = Number(item.id);
    this.courseDetail.idCourse = this.idCourse;
    localStorage.setItem('idCourse', this.idCourse.toString());
    localStorage.setItem('idLesson', item.id.toString());
    this.router.navigateByUrl(`/courses/learning/${item.name}`);
    window.location.reload();
  }

  getLearnedLessonArray(learnedLesson: string) {
    this.learnedLessons = learnedLesson.split(',').map((id) => Number(id));
  }

  checkIsLearned(learnedLessons: any, idLesson: any): boolean {
    if (learnedLessons.find((item) => Number(item) == Number(idLesson))) {
      return true;
    } else {
      return false;
    }
  }

  saveNote() {
    this.courseService
      .saveNote({
        ID_USER: Number(this.idUser),
        ID_LESSON: this.idLeson,
        CONTENT: this.takeNote,
        NOTE_TIME: 1.1,
      })
      .subscribe((res) => {
        if (res.success) {
          this.createNotification(res.message, 'success');
        } else {
          this.createNotification(res.message, 'error');
        }
      });
  }

  updateNote() {
    this.courseService
      .updateNote({
        ID_NOTE: this.idNote,
        ID_USER: Number(this.idUser),
        ID_LESSON: this.idLeson,
        CONTENT: this.takeNote,
        NOTE_TIME: 1.1,
      })
      .subscribe((res) => {
        if (res.success) {
          this.createNotification(res.message, 'success');
        } else {
          this.createNotification(res.message, 'error');
        }
      });
  }

  userGetNoteAPI() {
    this.courseService
      .userGetNote({
        ID_USER: Number(this.idUser),
        ID_LESSON: this.idLeson,
      })
      .subscribe((res) => {
        if (res.success) {
          if (!res.data.CONTENT) {
            this.isNoted = false;
          } else {
            this.isNoted = true;
            this.idNote = res.data.ID_NOTE;
            this.takeNote = res.data.CONTENT;
          }
        }
      });
  }

  getListExerciseAPI() {
    this.isLoadingQuiz = true;
    this.courseService.getListExercise({
      ID_LESSON: Number(this.idLeson),
      ID_USER: Number(this.idUser)
    }).subscribe((res) => {
      if (res.success) {
        this.quizs = res.data;
        this.isLoadingQuiz = false;
      }
    })
  }

  checkIsFinish(input: any): boolean {
    const userAnswer = input.QUIZ_INFO.find((item) => item.QUIZ_USER_INFO.length > 0);
    if (userAnswer) {
      return true;
    }
    else return false;
  }

  doExercise() {
    this.courseService.idCourse = Number(this.idCourse);
    this.courseService.idLesson = Number(this.idLeson)
    localStorage.setItem('idCourse', this.idCourse.toString());
    localStorage.setItem('idLesson', this.idLeson.toString());
  }
}
