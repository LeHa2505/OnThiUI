import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ComponentsModule } from 'src/app/shared/components/components.module';

import { PageRoutingModule } from './page-routing.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { NzCardModule } from 'ng-zorro-antd/card';
import { IconsProviderModule } from '../icons-provider.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutUserComponent } from './layout-user/layout-user.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RequestLCComponent } from './user/manage-lcs/request-lc/request-lc.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { ListLCsComponent } from './user/manage-lcs/list-lcs/list-lcs.component';
import { DetailLcComponent } from './user/manage-lcs/detail-lc/detail-lc.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { ProfileComponent } from './user/profile/profile.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { HomePageComponent } from './user/home-page/home-page.component';
import { ListCourseComponent } from './user/course/list-course/list-course.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { PrevDirective } from './user/course/list-course/directives/prev.directive';
import { NextDirective } from './user/course/list-course/directives/next.directive';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { DetailCourseComponent } from './user/course/detail-course/detail-course.component';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { LearningCourseComponent } from './user/course/learning-course/learning-course.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { QuizComponent } from './user/course/quiz/quiz.component';
import {
  IgxButtonModule,
  IgxCalendarModule,
  IgxDialogModule,
  IgxTooltipModule,
  IgxToggleModule,
  IgxDatePickerModule
} from 'igniteui-angular';
import { HammerModule } from '@angular/platform-browser';
import { MyCalendarComponent } from './user/my-calendar/my-calendar.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { WatchVideoComponent } from './user/videos/watch-video/watch-video.component';
import { ListVideosComponent } from './user/videos/list-videos/list-videos.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { FileManageComponent } from './user/file-manage/file-manage.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@NgModule({
  declarations: [
    LayoutUserComponent,
    RequestLCComponent,
    ListLCsComponent,
    DetailLcComponent,
    ProfileComponent,
    HomePageComponent,
    ListCourseComponent,
    PrevDirective,
    NextDirective,
    DetailCourseComponent,
    LearningCourseComponent,
    QuizComponent,
    MyCalendarComponent,
    WatchVideoComponent,
    ListVideosComponent,
    FileManageComponent,
  ],
  
  imports: [
    NzTreeModule,
    NzPaginationModule,
    NzSkeletonModule,
    NzNotificationModule,
    IgxDatePickerModule,
    IgxTooltipModule,
    IgxToggleModule,
    HammerModule,
    NzCommentModule,
    NzRateModule,
    NzProgressModule,
    NzTypographyModule,
    NzDescriptionsModule,
    NzInputNumberModule,
    NzTabsModule,
    NzTabsModule,
    NzDropDownModule,
    NzListModule,
    NzDrawerModule,
    NzUploadModule,
    NzBadgeModule,
    NzSpinModule,
    NzRadioModule,
    NzBreadCrumbModule,
    NzMenuModule,
    CommonModule,
    PageRoutingModule,
    NzTableModule,
    NzDividerModule,
    ComponentsModule,
    HttpClientModule,
    NgChartsModule,
    NzCardModule,
    IconsProviderModule,
    NzGridModule,
    NzButtonModule,
    NzIconModule,
    HttpClientModule,
    NzToolTipModule,
    NzInputModule,
    NzFormModule,
    ReactiveFormsModule,
    FormsModule,
    NzLayoutModule,
    ScrollingModule,
    NzCollapseModule,
    NzCheckboxModule,
    NzSelectModule,
    NzDatePickerModule,
    NzModalModule,
    NzMessageModule,
    NzStepsModule,
    NzPopconfirmModule,
    NzTagModule,
    NzTreeSelectModule,
    NzAvatarModule,
    EditorModule,
    IgxButtonModule,
    IgxCalendarModule,
    IgxDialogModule,
    NgxDocViewerModule,
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
  ],
})
export class PagesModule {}
