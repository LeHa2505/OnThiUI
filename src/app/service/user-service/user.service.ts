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

  constructor(private http: HttpClient) {}

  listBank(): Observable<any> {
    return this.http.get(
      environment.BASE_API_URI.BASE_SERVICE_API + `/user/banks`,
      this.httpOptions
    );
  }

  listCustomer(): Observable<any> {
    return this.http.get(
      environment.BASE_API_URI.BASE_SERVICE_API + `/user/customers`,
      this.httpOptions
    );
  }

  getInfo(): Observable<any> {
    return this.http.get(
      environment.BASE_API_URI.BASE_SERVICE_API + `/user`,
      this.httpOptions
    );
  }

  updateInfo(body: any): Observable<any> {
    return this.http.put(
      environment.BASE_API_URI.BASE_SERVICE_API + `/user/change/profile`,
      body,
      this.httpOptions
    );
  }
}
