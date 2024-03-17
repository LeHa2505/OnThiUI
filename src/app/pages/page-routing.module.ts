import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestLCComponent } from './user/manage-lcs/request-lc/request-lc.component';
import { ListLCsComponent } from './user/manage-lcs/list-lcs/list-lcs.component';
import { DetailLcComponent } from './user/manage-lcs/detail-lc/detail-lc.component';
import { ProfileComponent } from './user/profile/profile.component';
import { HomePageComponent } from './user/home-page/home-page.component';
import { ListCourseComponent } from './user/course/list-course/list-course.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'courses',
    component: ListCourseComponent,
  },
  {
    path: 'request-lc/:id',
    component: RequestLCComponent,
  },
  {
    path: 'agreements',
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
    component: ProfileComponent
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
