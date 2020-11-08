import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, mapTo, catchError } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import * as jwt_decode from 'jwt-decode';

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
  private authUrlRefresh = environment.userApi + '/guest-login';
  constructor(private http: HttpClient) { }

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
    if(this.getLoggedUser() && this.getLoggedUser().type == 'admin') {
      return true;
    }
    return false;
  }
  isSuperAdmin(): boolean {
    if(this.getLoggedUser() && this.getLoggedUser().type == 'superadmin') {
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

}
