import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutUserComponent } from './pages/layout-user/layout-user.component';
import { AuthGuard } from './_guards/authGuard';

const routes: Routes = [
  {
    path: '',
    component: LayoutUserComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/page.module').then((m) => m.PagesModule),
      },
      // Thêm các route con cho trang layout chung ở đây
    ],
    // canActivate: [AuthGuard]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {
    path: 'exception',
    loadChildren: () =>
      import('./shared/exception/exception.module').then(
        (m) => m.ExceptionModule
      ),
  },
  { path: '**', redirectTo: '/exception/403' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
