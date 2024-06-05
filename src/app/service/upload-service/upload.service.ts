import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {

  constructor(private http: HttpClient) {}

  // upload(formData: FormData): Observable<HttpEvent<string[]>> {
  //   return this.http.post<string[]>(`${this.server}/file/upload`, formData, {
  //     reportProgress: true,
  //     observe: 'events'
  //   });
  // }

  // // define function to download files
  // download(filename: string): Observable<HttpEvent<Blob>> {
  //   return this.http.get(`${this.server}/file/download/${filename}/`, {
  //     reportProgress: true,
  //     observe: 'events',
  //     responseType: 'blob'
  //   });
  // }

  public upload(image: any): Observable<any> {
    const formData = new FormData();
    formData.append('file', image);
    return this.http.post<any>(environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + '/upload/image', 
    formData);
  }
}
