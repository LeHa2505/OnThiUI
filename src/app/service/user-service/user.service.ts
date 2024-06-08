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

  getAllProvinces(): Observable<any> {
    return this.http.get<any>(this.jsonURL);
  }
}
