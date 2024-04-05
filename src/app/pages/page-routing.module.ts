import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestLCComponent } from './user/manage-lcs/request-lc/request-lc.component';
import { ListLCsComponent } from './user/manage-lcs/list-lcs/list-lcs.component';
import { DetailLcComponent } from './user/manage-lcs/detail-lc/detail-lc.component';
import { ProfileComponent } from './user/profile/profile.component';
import { HomePageComponent } from './user/home-page/home-page.component';
import { ListCourseComponent } from './user/course/list-course/list-course.component';
import { DetailCourseComponent } from './user/course/detail-course/detail-course.component';
import { LearningCourseComponent } from './user/course/learning-course/learning-course.component';
import { QuizComponent } from './user/course/quiz/quiz.component';
import {MyCalendarComponent} from "./user/my-calendar/my-calendar.component";
import { WatchVideoComponent } from './user/videos/watch-video/watch-video.component';
import {ListVideosComponent} from "./user/videos/list-videos/list-videos.component";

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
    path: 'LCs',
    children: [
      {
        path: '',
        component: ListLCsComponent,
      },
      {
        path: ':id',
        component: DetailLcComponent,
      },
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'bank',
    children: [
      {
        path: 'LCs', // Đường dẫn trống để đảm bảo đây là trang mặc định của layout chung
        component: ListLCsComponent,
      },
      // Thêm các route con cho trang layout chung ở đây
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageRoutingModule {}
