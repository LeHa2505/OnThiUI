import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LcService {
  private httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('id_token')}`,
    }),
  };

  constructor(private http: HttpClient) {}

  create(body: any): Observable<any> {
    return this.http.post(
      environment.BASE_API_URI.BASE_LETTER_OF_CREDIT_API + `/create`,
      body,
      this.httpOptions
    );
  }

  list(): Observable<any> {
    return this.http.get(
      environment.BASE_API_URI.BASE_LETTER_OF_CREDIT_API,
      this.httpOptions
    );
  }

  detail(id: String): Observable<any> {
    return this.http.get(
      environment.BASE_API_URI.BASE_LETTER_OF_CREDIT_API + `/${id}`,
      this.httpOptions
    );
  }

  update(id: String, body: any): Observable<any> {
    return this.http.patch(
      environment.BASE_API_URI.BASE_LETTER_OF_CREDIT_API + `${id}`,
      body,
      this.httpOptions
    );
  }

  approve(id: String, body: any): Observable<any> {
    return this.http.patch(
      environment.BASE_API_URI.BASE_LETTER_OF_CREDIT_API + `/${id}/approve`,
      body,
      this.httpOptions
    );
  }

  return(id: String, body: any): Observable<any> {
    return this.http.patch(
      environment.BASE_API_URI.BASE_LETTER_OF_CREDIT_API + `/${id}/reject`,
      body,
      this.httpOptions
    );
  }

  updateStatus(id: String, body: any): Observable<any> {
    return this.http.patch(
      environment.BASE_API_URI.BASE_LETTER_OF_CREDIT_API + `/${id}/status`,
      body,
      this.httpOptions
    );
  }

  getContractEvent(id: String): Observable<any> {
    return this.http.get(
      environment.BASE_API_URI.BASE_SERVICE_API + `/contractevents/${id}`,
      this.httpOptions
    );
  }
}
