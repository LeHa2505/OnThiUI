import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${localStorage.getItem('id_token')}`,
    }),
  };

  constructor(private http: HttpClient) { }

  getGroupsByUserId(id: number): Observable<any> {
    return this.http.get(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + `/groups/${id}`,
      this.httpOptions
    );
  }

  getMessages(id: number): Observable<any> {
    return this.http.get(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + `/getMessages?idGroup=${id}`,
      this.httpOptions
    );
  }
}
