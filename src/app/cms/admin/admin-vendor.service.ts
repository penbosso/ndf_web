import { Vendor } from './../../user/vendor';
import { VendorPage } from './vendorPage';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { VendorInfo } from './vendorInfo';

@Injectable({
  providedIn: 'root'
})
export class AdminVendorService {
  private vendorApiBaseUrl = environment.vendorApi;

  constructor(private http: HttpClient) { }

  showVendors(): Observable<VendorPage> {

    return this.http.get<VendorPage>(this.vendorApiBaseUrl).pipe(
      catchError(this.handleError)
    );
  }

  getVendorByCode(code: string): Observable<VendorInfo> {
    return this.http.get<VendorInfo>(`${this.vendorApiBaseUrl}/code/${code}`).pipe(
      catchError(this.handleError)
    );
  }

  getVendorByid(id: string): Observable<VendorInfo> {
    return this.http.get<VendorInfo>(`${this.vendorApiBaseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  saveBulkData(bulkData: VendorInfo[]): Observable<VendorInfo[]> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<VendorInfo[]>(`${this.vendorApiBaseUrl}/bulk`, bulkData, {headers})
            .pipe(
              tap( data => {
                console.log('save bulk data', JSON.stringify(data));
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
