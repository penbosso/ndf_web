import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { News } from './news';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { NewsPage } from '../cms/admin/newsPage';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private newsApiBaseUrl = environment.newsfeedApi

  constructor(private http: HttpClient) { }

  saveNews(news: News): Observable<News> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<News>(this.newsApiBaseUrl, news, {headers:headers})
      .pipe(
        tap(data =>{
          console.log('save News: '+ JSON.stringify(data))
        }),
        catchError(this.handleError)
      );
  }

  deleteNews(newsId: string): Observable<{}> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const url = `${this.newsApiBaseUrl}/${newsId}`; console.log(url);
    return this.http.delete(url, {headers:headers})
      .pipe(
        tap(data =>{
          console.log('delete News: '+ JSON.stringify(data))
        }),
        catchError(this.handleError)
      );
  }

  updateNews(news: News): Observable<News> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.put<News>(`${this.newsApiBaseUrl}/${news.id}`, news, {headers:headers})
      .pipe(
        tap(data =>{
          console.log('update News: '+ JSON.stringify(data))
        }),
        catchError(this.handleError)
      );
  }

  getNews(): Observable<NewsPage> {
    return this.http.get<NewsPage>(this.newsApiBaseUrl).pipe(
      tap(data => console.log("All: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getNewsById(id: string): Observable<News> {
    return this.http.get<News>(`${this.newsApiBaseUrl}/${id}`).pipe(
      tap(data => console.log("news: " + JSON.stringify(data))),
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
