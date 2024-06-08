import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './user/profile/profile.component';
import { HomePageComponent } from './user/home-page/home-page.component';
import { ListCourseComponent } from './user/course/list-course/list-course.component';
import { DetailCourseComponent } from './user/course/detail-course/detail-course.component';
import { LearningCourseComponent } from './user/course/learning-course/learning-course.component';
import { QuizComponent } from './user/course/quiz/quiz.component';
import {MyCalendarComponent} from "./user/my-calendar/my-calendar.component";
import { WatchVideoComponent } from './user/videos/watch-video/watch-video.component';
import {ListVideosComponent} from "./user/videos/list-videos/list-videos.component";
import { FileManageComponent } from './user/file-manage/file-manage.component';
import { ChatComponent } from './user/chat/chat.component';
import { MessageComponent } from './user/message/message.component';
import { BuyCourseComponent } from './user/buy-course/buy-course.component';

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
        component: ListCourseComponent
      },
      {
        path: 'buy',
        component: BuyCourseComponent
      },
      {
        path: ':id',
        component: DetailCourseComponent,
      },
      {
        path: 'learning/:id',
        component: LearningCourseComponent
      },
      {
        path: 'quizs/:id',
        component: QuizComponent
      }
    ],
  },
  {
    path: 'my-calendar',
    component: MyCalendarComponent
  },
  {
    path: 'shorts',
    children: [
      {
        path: '',
        component: ListVideosComponent
      },
      {
        path: ':id',
        component: WatchVideoComponent
      }
    ]
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
    component: ChatComponent
  },
  {
    path: 'message',
    component: MessageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
