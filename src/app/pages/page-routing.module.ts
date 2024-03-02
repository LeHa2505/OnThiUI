import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewAgreementComponent } from './user/manage-agreements/new-agreement/new-agreement.component';
import { RequestLCComponent } from './user/manage-lcs/request-lc/request-lc.component';
import { ListNewRequestComponent } from './user/manage-agreements/list-new-request/list-new-request.component';
import { DetailAgreementComponent } from './user/manage-agreements/detail-agreement/detail-agreement.component';
import { ListAgreementComponent } from './user/manage-agreements/list-agreement/list-agreement.component';
import { ListLCsComponent } from './user/manage-lcs/list-lcs/list-lcs.component';
import { DetailLcComponent } from './user/manage-lcs/detail-lc/detail-lc.component';
import { UploadDocumentComponent } from './user/manage-documents/upload-document/upload-document.component';
import { ListDocumentsComponent } from './user/manage-documents/list-documents/list-documents.component';
import { EventContractComponent } from './user/event-contract/event-contract.component';
import { ProfileComponent } from './user/profile/profile.component';
import { DetailDocumentComponent } from './user/manage-documents/detail-document/detail-document.component';

const routes: Routes = [
  {
    path: '',
    component: NewAgreementComponent,
  },
  {
    path: 'request-lc/:id',
    component: RequestLCComponent,
  },
  {
    path: 'agreements',
    children: [
      {
        path: '',
        component: ListAgreementComponent,
      },
      {
        path: 'list-new-request', // Đường dẫn trống để đảm bảo đây là trang mặc định của layout chung
        component: ListNewRequestComponent,
      },
      {
        path: ':id', // Đường dẫn trống để đảm bảo đây là trang mặc định của layout chung
        component: DetailAgreementComponent,
      },
      // Thêm các route con cho trang layout chung ở đây
    ],
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
      {
        path: 'upload/:id',
        component: UploadDocumentComponent,
      },
      {
       path: 'event-contract/:id',
       component: EventContractComponent 
      }
    ],
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'documents',
    children: [
      {
        path: '',
        component: ListDocumentsComponent,
      },
      {
        path: 'upload/:id',
        component: UploadDocumentComponent,
      },
      {
        path: ':id',
        component: DetailDocumentComponent,
      },
    ],
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
