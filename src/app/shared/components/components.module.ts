import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { IconsProviderModule } from '../../icons-provider.module';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { LoadingComponent } from './loading/loading.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { EmptyComponent } from './empty/empty.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { ButtonComponent } from './button/button.component';
import { TextavatarComponent } from './textavatar/textavatar.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SelectComponent } from './select/select.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule } from '@angular/forms';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { HeaderComponent } from './header/header.component';
import { InputTextComponent } from './input-text/input-text.component';
import { InfoTextComponent } from './info-text/info-text.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';



@NgModule({
  declarations: [
    BreadcrumbComponent,
    LoadingComponent,
    EmptyComponent,
    ButtonComponent,
    TextavatarComponent,
    PaginationComponent,
    SelectComponent,
    HeaderComponent,
    InputTextComponent,
    InfoTextComponent,
  ],
  imports: [
    NzGridModule,
    NzLayoutModule,
    CommonModule,
    RouterModule,
    IconsProviderModule,
    NzSpinModule,
    NzModalModule,
    NzButtonModule,
    NzEmptyModule,
    NzPopoverModule,
    NzPopconfirmModule,
    NzMessageModule,
    NzIconModule,
    NzAvatarModule,
    NzSelectModule,
    FormsModule,
    NzPaginationModule,
    NzInputModule
  ],
  exports: [
    BreadcrumbComponent,
    LoadingComponent,
    EmptyComponent,
    ButtonComponent,
    TextavatarComponent,
    PaginationComponent,
    SelectComponent,
    HeaderComponent,
    InfoTextComponent,
    InputTextComponent
  ],
})
export class ComponentsModule {}
