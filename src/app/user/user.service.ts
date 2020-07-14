import { User } from './user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '../login/auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApiBaseUrl = environment.userApi;
  constructor(private http: HttpClient,
              public auth:AuthService) { }

  createUser(user: User): Observable<User> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<User>(this.userApiBaseUrl, user, {headers:headers})
      .pipe(
        tap(data =>{
          this.auth.doLoginUser(data);
          console.log('create User: '+ JSON.stringify(data))
        }),
        catchError(this.handleError)
      );
  }

  updateUser(user: User): Observable<User> {
    const headers =  new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<User>(`${this.userApiBaseUrl}/${user.id}`, user, {headers: headers})
    .pipe(
      tap(data =>{
        console.log('User Updated: '+ JSON.stringify(data))
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    }
    else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
