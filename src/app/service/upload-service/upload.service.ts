import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  upload(body: any): Observable<any> {
    return this.http.post(
      environment.BASE_API_URI.BASE_SERVICE_TEST_API + `/files/upload`,
      body
    );
  }

  ocr_document(body: any): Observable<any> {
    // return this.http.post('http://34.142.236.121:8089/ocr_document', body);
    // return this.http.post('http://localhost:8000/ocr_document', body);
    return this.http.post('https://ocr-v1.onrender.com/ocr_document', body);
  }
}
