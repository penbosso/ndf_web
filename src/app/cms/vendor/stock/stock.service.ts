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
        tap(data =>{
          console.log('save Stock: '+ JSON.stringify(data))
        }),
        catchError(this.handleError)
      );
  }

  deleteStock(stock: string): Observable<{}> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url = `${this.stockApiBaseUrl}/${stock}`; console.log(url);
    return this.http.delete(url, {headers:headers})
      .pipe(
        tap(data =>{
          console.log('delete Stock: '+ JSON.stringify(data))
        }),
        catchError(this.handleError)
      );
  }

  updateStock(stock: Stock): Observable<Stock> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<Stock>(`${this.stockApiBaseUrl}/${stock.id}`, stock, {headers:headers})
      .pipe(
        tap(data =>{
          console.log('update Stock: '+ JSON.stringify(data))
        }),
        catchError(this.handleError)
      );
  }

  getStocks(): Observable<StockPage> {
    return this.http.get<StockPage>(`${this.stockApiBaseUrl}?pageSize=1500`).pipe(
      tap(data => console.log("All: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getVendorsStocks(): Observable<StockPage> {
    return this.http.get<StockPage>(`${this.stockApiBaseUrl}?pageSize=500&vendorId=${this.auth.getLoggedUser().vendorId}`).pipe(
      tap(data => console.log("All: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getVendorsPendingStocks(): Observable<StockPage> {
    return this.http.get<StockPage>(`${this.stockApiBaseUrl}?isApproved=false&pageSize=500&vendorId=${this.auth.getLoggedUser().vendorId}`).pipe(
      tap(data => console.log("All: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getStockById(id: string): Observable<Stock> {
    return this.http.get<Stock>(`${this.stockApiBaseUrl}/${id}`).pipe(
      tap(data => console.log("stock: " + JSON.stringify(data))),
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
