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
import { LoginComponent } from '../authentication/login/login.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NewAgreementComponent } from './user/manage-agreements/new-agreement/new-agreement.component';
import { RequestLCComponent } from './user/manage-lcs/request-lc/request-lc.component';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { ListNewRequestComponent } from './user/manage-agreements/list-new-request/list-new-request.component';
import { DetailAgreementComponent } from './user/manage-agreements/detail-agreement/detail-agreement.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { ListAgreementComponent } from './user/manage-agreements/list-agreement/list-agreement.component';
import { ListLCsComponent } from './user/manage-lcs/list-lcs/list-lcs.component';
import { DetailLcComponent } from './user/manage-lcs/detail-lc/detail-lc.component';
import { UploadDocumentComponent } from './user/manage-documents/upload-document/upload-document.component';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { ListDocumentsComponent } from './user/manage-documents/list-documents/list-documents.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { EventContractComponent } from './user/event-contract/event-contract.component';
import { ProfileComponent } from './user/profile/profile.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { DetailDocumentComponent } from './user/manage-documents/detail-document/detail-document.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';


@NgModule({
  declarations: [
    LoginComponent,
    LayoutUserComponent,
    NewAgreementComponent,
    RequestLCComponent,
    ListNewRequestComponent,
    DetailAgreementComponent,
    ListAgreementComponent,
    ListLCsComponent,
    DetailLcComponent,
    UploadDocumentComponent,
    ListDocumentsComponent,
    EventContractComponent,
    ProfileComponent,
    DetailDocumentComponent,
  ],
  imports: [
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
    NzTreeSelectModule
  ],
})
export class PagesModule {}
