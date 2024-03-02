import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { tap, shareReplay } from 'rxjs/operators';
// import { verify, decode } from "jsonwebtoken";
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  private httpOptions: any;

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  register(body: any): Observable<any> {
    return this.http.post(
      environment.BASE_API_URI.BASE_SERVICE_API + '/auth/register',
      body
    );
  }

  login(body: any): Observable<any> {
    return this.http
      .post(environment.BASE_API_URI.BASE_SERVICE_API + '/auth/login', body)
      .pipe(
        tap((res) => this.setSession(res)),
        shareReplay()
      );
  }

  private setSession(authResult) {
    const authResultDecode = this.getDecodedAccessToken(authResult.accessToken);
    const refreshTokenDecode = this.getDecodedAccessToken(
      authResult.refreshToken
    );

    const expiresAt = moment().add(authResultDecode.exp, 'second');

    localStorage.setItem('email', authResultDecode.email);
    localStorage.setItem('role', authResultDecode.role);
    localStorage.setItem('id_token', authResult.accessToken);
    localStorage.setItem('refresh_token', authResult.refreshToken);
    localStorage.setItem('username', authResultDecode.username);
    // localStorage.setItem('created_at', authResultDecode.iat);
    // localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
      }),
    };
  }

  logout(): Observable<any> {
    return this.http.post(
      environment.BASE_API_URI.BASE_SERVICE_API + '/auth/logout/',
      { refreshToken: localStorage.getItem('refresh_token') }
    );
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  refresh() {
    let body = {
      accessToken: localStorage.getItem('id_token'),
      refreshToken: localStorage.getItem('refresh_token'),
    };
    return this.http.post(
      environment.BASE_API_URI.BASE_SERVICE_API + '/auth/refresh',
      body,
      this.httpOptions
    );
  }
}
