import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('id_token')}`,
    }),
  };

  private httpOptionsProvince = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Token: `d6e3dccb-6289-11ea-8b85-c60e4edfe802`,
    }),
  };

  private jsonURL = 'assets/provinces.json';

  public userId: number;
  public userName: string;
  public userAvatar: string;
  public userInfo: any;

  constructor(private http: HttpClient) {}

  getListCourses(id: any): Observable<any> {
    return this.http.get(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API +
        `/user/getListCoursesByUserId/${id}`,
      this.httpOptions
    );
  }

  getUserInfo(email: string): Observable<any> {
    return this.http.get(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API +
        `/getUserInfo?email=${email}`,
      this.httpOptions
    );
  }

  getAllProvinces(): Observable<any> {
    return this.http.get<any>(this.jsonURL);
  }

  getAllUser(): Observable<any> {
    return this.http.get(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + "/user/getAll",
      this.httpOptions
    );
  }

  updateUserInfo(body: any): Observable<any> {
    return this.http.post(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + "/user/updateUserInfo",
      body,
      this.httpOptions
    );
  }

  // getListNotification(idUser: any): Observable<any> {
  //   return this.http.get(
  //     environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + `/notification/${idUser}`,
  //     this.httpOptions
  //   );
  // }

  createNotification(body: any): Observable<any> {
    return this.http.post(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + "/admin/create/notification",
      body,
      this.httpOptions
    );
  }

  updateNotification(body: any): Observable<any> {
    return this.http.post(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + "/admin/update/notification",
      body,
      this.httpOptions
    );
  }
  
  getListNotification(idUser: string): Observable<any> {
    return this.http.get<any>(`${environment.BASE_API_URI.BASE_SERVICE_ONTHI_API}/notifications/${idUser}`);
  }
}
