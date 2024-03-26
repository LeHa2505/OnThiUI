import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { vi_VN } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import vi from '@angular/common/locales/vi';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAnchorModule } from 'ng-zorro-antd/anchor';
import { LayoutComponent } from './layout/layout.component';
import { NgChartsModule } from 'ng2-charts';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './_guards/authGuard';
import { authInterceptorProviders } from './_guards/authInterceptor';
import { HammerModule } from '@angular/platform-browser';


registerLocaleData(vi);

@NgModule({
  declarations: [AppComponent, LayoutComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzAnchorModule,
    NgChartsModule,
    NzIconModule,
    NzButtonModule,
    NzTableModule,
    NzMessageModule,
    NzModalModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: vi_VN }
    , AuthGuard
    // , authInterceptorProviders
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
