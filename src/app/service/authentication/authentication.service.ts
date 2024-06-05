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
      environment.BASE_API_URI.BASE_SERVICE_API + '/service-auth/register',
      body
    );
  }

  login(body: any): Observable<any> {
    return this.http
      .post(environment.BASE_API_URI.BASE_SERVICE_API + '/service-auth/login', body)
      .pipe(
        tap((res) => this.setSession(res)),
        shareReplay()
      );
  }

  private setSession(authResult) {
    const authResultDecode = this.getDecodedAccessToken(authResult.data.accessToken);
    const refreshTokenDecode = this.getDecodedAccessToken(
      authResult.refreshToken
    );
  
    const expiresAt = moment().add(authResultDecode.exp, 'second');

    localStorage.setItem('email', authResultDecode.sub);
    localStorage.setItem('user_id', authResult.data.userInfoDTO.ID_USER);
    localStorage.setItem('role', authResultDecode.roles);
    localStorage.setItem('id_token', authResult.data.accessToken);
    localStorage.setItem('refresh_token', authResult.data.refreshToken);
    localStorage.setItem('username', authResult.data.userInfoDTO.USERNAME);
    localStorage.setItem('avatar', authResult.data.userInfoDTO.AVATAR);
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
