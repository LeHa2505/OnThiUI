import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${localStorage.getItem('id_token')}`,
    }),
  };

  public idCourse: number;
  public idLesson: number;

  constructor(private http: HttpClient) {}

  getListCoursesByInputCondition(body: any): Observable<any> {
    return this.http.post(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + '/courses',
      body,
      this.httpOptions
    );
  }

  guestGetDetailCourse(id: number): Observable<any> {
    return this.http.get(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + `/guest/getDetailCourse/${id}`,
      this.httpOptions
    );
  }   

  userGetDetailCourse(id: number): Observable<any> {
    return this.http.get(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + `/user/getDetailCourse/${id}`,
      this.httpOptions
    );
  }   

  userGetListReview(id: any): Observable<any> {
    return this.http.get(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + `/user/getReview/${id}`,
      this.httpOptions
    );  
  }

  userUnlikeUndislikeReview(body: any): Observable<any> {
    return this.http.post(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + '/user/userUnlikeUndislikeReview',
      body,
      this.httpOptions
    );
  }

  userLikeDislikeReview(body: any): Observable<any> {
    return this.http.post(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + '/user/likeDislikeReview',
      body,
      this.httpOptions
    );
  }

  createReview(body: any): Observable<any> {
    return this.http.post(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + '/user/createReview',
      body,
      this.httpOptions
    );
  }

  deleteReview(id: any): Observable<any> {
    return this.http.delete(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + `/user/deleteReview/${id}`,
      this.httpOptions
    );
  }

  userGetLessonDetail(id: any): Observable<any> {
    return this.http.get(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + `/user/userGetLessonDetail/${id}`,
      this.httpOptions
    );  
  }

  userGetListComment(id: any): Observable<any> {
    return this.http.get(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + `/user/getComment/${id}`,
      this.httpOptions
    );  
  }

  enrollCourse(body: any): Observable<any> {
    return this.http.post(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + `/user/enrollCourse`,
      body,
      this.httpOptions
    );  
  }

  updateLearningProcess(body: any): Observable<any> {
    return this.http.post(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + `/user/updateLearningProcess`,
      body,
      this.httpOptions
    );  
  }

  userGetNote(body: any): Observable<any> {
    return this.http.post(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + `/user/getNote`,
      body,
      this.httpOptions
    );  
  }

  getListExercise(body: any): Observable<any> {
    return this.http.post(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + `/user/getListExercise`,
      body,
      this.httpOptions
    );  
  }

  updateNote(body: any): Observable<any> {
    return this.http.post(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + `/user/updateNote`,
      body,
      this.httpOptions
    );  
  }

  saveNote(body: any): Observable<any> {
    return this.http.post(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + `/user/saveNote`,
      body,
      this.httpOptions
    );  
  }

  getDetailExercise(id: any): Observable<any> {
    return this.http.get(
      environment.BASE_API_URI.BASE_SERVICE_ONTHI_API + `/user/getDetailExercise/${id}`,
      this.httpOptions
    );  
  }
}
