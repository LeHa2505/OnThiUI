import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';


import { AuthenticationService } from '../service/authentication/authentication.service';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

const TOKEN_HEADER_KEY = 'Authorization'; 
// const TOKEN_HEADER_KEY = 'x-access-token';   

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private authService: AuthenticationService) {}

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token),
    });

    // return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, token) });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = localStorage.getItem('refresh_token');

      if (token)
        return this.authService.refresh().pipe(
          switchMap((res: any) => {
            this.isRefreshing = false;
            // this.tokenService.saveToken(token.accessToken);
            localStorage.removeItem('id_token')
            localStorage.removeItem('refresh_token');
            localStorage.setItem('id_token', res.accessToken)
            localStorage.setItem('refresh_token', res.refreshToken);
            this.refreshTokenSubject.next(res.refreshToken);

            return next.handle(this.addTokenHeader(request, res.accessToken));
          }
        ))
        catchError((err) => {
          this.isRefreshing = false;
          localStorage.clear();
          return throwError(err);
        });
    }

    return this.refreshTokenSubject.pipe(
      filter((token) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    let authReq = req;
    const token = localStorage.getItem('id_token');
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (
          error instanceof HttpErrorResponse &&
          !authReq.url.includes('/auth/login') &&
          error.status === 401
        ) {
          return this.handle401Error(authReq, next);
        }
        return throwError(error);
      })
    );
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
