import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, mapTo, catchError } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';
import { throwError } from 'rxjs/internal/observable/throwError';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly RERESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: 'LOGGED_USER';

  private eventAuthError = new BehaviorSubject<string>("");
  eventAuthError$ = this.eventAuthError.asObservable();

  private authUrl = environment.userApi + '/login';
  private sendPinUrl = environment.userApi + '/send-pin/';
  private resertPasswordUrl = environment.userApi+ '/reset-password';
  private authUrlRefresh = environment.userApi + '/guest-login';
  constructor(private http: HttpClient) { }

  sendResetPasswordPin(telephone: string): Observable<boolean> {
    return this.http.post<any>(this.sendPinUrl+telephone['telephone'], {telephone})
    .pipe(
      catchError(this.handleError)
    );
  }

  resetPassword({telephone, password, pin}): Observable<boolean> {
    console.log({telephone, password, pin});
    return this.http.post<any>(this.resertPasswordUrl, {telephone, password, pin})
    .pipe(
      catchError(this.handleError)
    );
  }

  login(telephone: string, password: string): Observable<boolean> {
    return this.http.post<any>(this.authUrl, {telephone, password})
          .pipe(
            tap(res => this.doLoginUser(res)),
            mapTo(true),
            catchError(error => {console.log(error);
              this.eventAuthError.next(error)
              return of(false);
            })
          );
  }

  logout() {
    localStorage.removeItem(this.loggedUser);
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.RERESH_TOKEN);
    return true;
  }

  isLoggedIn() {
    return !!this.getJwtToken();
  }

  refreshToken() {
    return this.http.post<any>(this.authUrlRefresh, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens) => {
      this.storeJwtToken(tokens.id);
    }));
  }

  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  isAdmin(): boolean {
    if(this.getLoggedUser() && this.getLoggedUser().type == 'administrator') {
      return true;
    }
    return false;
  }
  isSuperAdmin(): boolean {
    if(this.getLoggedUser() && this.getLoggedUser().type == 'super_administrator') {
      return true;
    }
    return false;
  }

  isVendor(): boolean  {
    if(this.getLoggedUser() && this.getLoggedUser().type == 'vendor') {
      return true;
    }
    return false;
  }

  isBuyer(): boolean  {
    if(this.getLoggedUser().type == 'buyer') {
      return true;
    }
    return false;
  }
  getLoggedUser() {
    return JSON.parse(localStorage.getItem(this.loggedUser));
  }

  doLoginUser(authResult) {
    const decoded = jwt_decode(authResult.token);
    const decodedUserInfo = JSON.parse(decoded["user_info"]);
    let decodedCompanyInfo = {};
    if (decoded["company_info"]) {
      decodedCompanyInfo = JSON.parse(decoded["company_info"])
    }
    console.log(decodedCompanyInfo)
    const currentUser = JSON.stringify({
      profilePic: decodedUserInfo["ProfilePic"],
      firstName: decodedUserInfo["FirstName"],
      otherName: decodedUserInfo["OtherNames"],
      companyCode: decodedUserInfo["CompanyCode"],
      telephone: decodedUserInfo["Telephone"],
      type: decoded["role"],
      id: decoded["Id"],
      vendorId: decodedCompanyInfo["id"]
    });
    console.log("cureent user **** ",currentUser );
    localStorage.setItem(this.loggedUser, currentUser );
    localStorage.setItem(this.JWT_TOKEN, authResult.token);
    localStorage.setItem(this.RERESH_TOKEN, authResult.refreshToken);
  }



  private getRefreshToken() {
    return localStorage.getItem(this.RERESH_TOKEN);
  }

  private storeJwtToken(jwt: string) {
    localStorage.setItem(this.JWT_TOKEN, jwt);
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
    } else if(err.message) {
      errorMessage = err.message;
    } else {
      errorMessage = "An error occurred please try again later";
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
