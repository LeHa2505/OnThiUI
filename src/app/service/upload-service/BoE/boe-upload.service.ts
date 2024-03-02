import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BoeUploadService {
  private httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('id_token')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  upload(body: any, id: any): Observable<any> {
    return this.http.post(
      environment.BASE_API_URI.BASE_SERVICE_API +
        `/billofexchanges/create/${id}`,
      body,
      this.httpOptions
    );
  }

  get(id: String): Observable<any> {
    return this.http.get(
      environment.BASE_API_URI.BASE_SERVICE_API + `/billofexchanges/${id}`,
      this.httpOptions
    );
  }

  approve(id: String, body: any): Observable<any> {
    return this.http.patch(
      environment.BASE_API_URI.BASE_SERVICE_API +
        `/billofexchanges/${id}/approve`,
      body,
      this.httpOptions
    );
  }

  reject(id: String, body: any): Observable<any> {
    return this.http.patch(
      environment.BASE_API_URI.BASE_SERVICE_API +
        `/billofexchanges/${id}/reject`,
      body,
      this.httpOptions
    );
  }
}
