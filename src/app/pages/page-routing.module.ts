import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './user/profile/profile.component';
import { HomePageComponent } from './user/home-page/home-page.component';
import { ListCourseComponent } from './user/course/list-course/list-course.component';
import { DetailCourseComponent } from './user/course/detail-course/detail-course.component';
import { LearningCourseComponent } from './user/course/learning-course/learning-course.component';
import { QuizComponent } from './user/course/quiz/quiz.component';
import { MyCalendarComponent } from './user/my-calendar/my-calendar.component';
import { WatchVideoComponent } from './user/videos/watch-video/watch-video.component';
import { ListVideosComponent } from './user/videos/list-videos/list-videos.component';
import { FileManageComponent } from './user/file-manage/file-manage.component';
import { ChatComponent } from './user/chat/chat.component';
import { MessageComponent } from './user/message/message.component';
import { BuyCourseComponent } from './user/buy-course/buy-course.component';
import { StudentManagerComponent } from './teacher/student-manager/student-manager.component';
import { CourseManagerComponent } from './teacher/course-manager/course-manager.component';
import { EditCourseComponent } from './teacher/edit-course/edit-course.component';
import { UserManageComponent } from './admin/user-manage/user-manage.component';
import { CourseManageComponent } from './admin/course-manage/course-manage.component';
import { CheckCourseComponent } from './admin/check-course/check-course.component';
import { CheckLessonComponent } from './admin/check-lesson/check-lesson.component';
import { RequestCourseComponent } from './admin/request-course/request-course.component';
import { NewCourseComponent } from './teacher/new-course/new-course.component';
import { ReelsComponent } from './teacher/reels/reels.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'courses',
    children: [
      {
        path: '',
        component: ListCourseComponent,
      },
      {
        path: 'buy',
        component: BuyCourseComponent,
      },
      {
        path: ':id',
        component: DetailCourseComponent,
      },
      {
        path: 'learning/:id',
        component: LearningCourseComponent,
      },
      {
        path: 'quizs/:id',
        component: QuizComponent,
      },
    ],
  },
  {
    path: 'my-calendar',
    component: MyCalendarComponent,
  },
  {
    path: 'shorts',
    children: [
      {
        path: '',
        component: ListVideosComponent,
      },
      {
        path: ':id',
        component: WatchVideoComponent,
      },
    ],
  },
  {
    path: 'files',
    children: [
      {
        path: '',
        component: FileManageComponent,
      },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'chat',
    component: ChatComponent,
  },
  {
    path: 'message',
    component: MessageComponent,
  },
  {
    path: 'student-manager',
    component: StudentManagerComponent,
  },
  {
    path: 'shorts-manager',
    component: ReelsComponent,
  },
  {
    path: 'course-manager',
    children: [
      {
        path: '',
        component: CourseManagerComponent,
      },
      {
        path: 'edit/:id',
        component: EditCourseComponent,
      },
      {
        path: 'detail/:id',
        component: CheckCourseComponent,
      },
      {
        path: 'new',
        component: NewCourseComponent,
      }
    ],
  },
  {
    path: 'admin',
    children: [
      {
        path: 'user-manage',
        component: UserManageComponent
      },
      {
        path: 'course-manage',
        component: CourseManageComponent
      },
      {
        path: 'course-detail',
        component: CheckCourseComponent
      },
      {
        path: 'lesson-detail/:id',
        component: CheckLessonComponent
      },
      {
        path: 'course-request',
        component: RequestCourseComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
