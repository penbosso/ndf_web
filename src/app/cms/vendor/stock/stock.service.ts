import { AuthService } from './../../../login/auth.service';
import { StockPage } from './stockPage';
import { Stock } from './stock';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stockApiBaseUrl = environment.stockApi

  constructor(private http: HttpClient, private auth: AuthService) { }

  saveStock(stock: Stock): Observable<Stock> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Stock>(this.stockApiBaseUrl, stock, {headers:headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteStock(stock: string): Observable<{}> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url = `${this.stockApiBaseUrl}/${stock}`;
    return this.http.delete(url, {headers:headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  updateStock(stock: any): Observable<Stock> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    // const newStockStatus = {"id": stock.id, "status": "pending", "statusComment": ""};
    return this.http.put<Stock>(`${this.stockApiBaseUrl}/${stock.id}`, stock, {headers:headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  approveOrDeclineStock(stock: any): Observable<Stock> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<Stock>(`${this.stockApiBaseUrl}/approval`, stock, {headers:headers})
      .pipe(
        catchError(this.handleError)
      );
  }


  getStocks(): Observable<StockPage> {
    return this.http.get<StockPage>(`${this.stockApiBaseUrl}?pageSize=1500`).pipe(
      catchError(this.handleError)
    );
  }

  getVendorsStocks(): Observable<StockPage> {
    return this.http.get<StockPage>(`${this.stockApiBaseUrl}?status=approved&pageSize=500&vendorId=${this.auth.getLoggedUser().vendorId}`).pipe(
      catchError(this.handleError)
    );
  }

  getPendingStocks(): Observable<StockPage> {
    return this.http.get<StockPage>(`${this.stockApiBaseUrl}?status=pending`).pipe(
      catchError(this.handleError)
    );
  }

  getVendorsPendingStocks(): Observable<StockPage> {
    return this.http.get<StockPage>(`${this.stockApiBaseUrl}?status=pending&pageSize=500&vendorId=${this.auth.getLoggedUser().vendorId}`).pipe(
      catchError(this.handleError)
    );
  }

  getVendorsDeclinedStocks(): Observable<StockPage> {
    return this.http.get<StockPage>(`${this.stockApiBaseUrl}?status=declined&pageSize=500&vendorId=${this.auth.getLoggedUser().vendorId}`).pipe(
      catchError(this.handleError)
    );
  }

  getStockById(id: string): Observable<Stock> {
    return this.http.get<Stock>(`${this.stockApiBaseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
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
