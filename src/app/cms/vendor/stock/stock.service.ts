import { Stock } from './stock';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private stockApiBaseUrl = environment.stockApi

  constructor(private http: HttpClient) { }

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

  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.stockApiBaseUrl).pipe(
      tap(data => console.log("All: " + JSON.stringify(data))),
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
