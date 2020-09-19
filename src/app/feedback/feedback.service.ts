import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from './feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbackBaseUrl= environment.feedbackApi;
  constructor(private http: HttpClient) { }

  saveFeedBack(feedback: Feedback): Observable<Feedback> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Feedback>(this.feedbackBaseUrl, feedback, {headers: headers})
      .pipe(catchError(this.handleError));
  }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.feedbackBaseUrl}?_sort=updatedAt:desc`).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    // if (err.error instanceof ErrorEvent) {
    //   errorMessage = `An error occurred: ${err.error.message}`;
    // }
    // else {
    //   errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    // }
    if(err.error){
      errorMessage = err.error.message;
    } else {
      errorMessage = "An error occurred please try again later";
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
