import { Component, OnInit } from '@angular/core';
import { News } from '../../../news/news';
import { environment } from 'src/environments/environment';
import { NewsService } from 'src/app/news/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-view-news',
  templateUrl: './admin-view-news.component.html',
  styleUrls: ['./admin-view-news.component.css']
})
export class AdminViewNewsComponent implements OnInit {

  popoverTitle = 'Confirm delete';
  popoverMessage = 'Are you sure you want to delete this news ?';
  confirmClicked = false;
  cancelClicked = false;

  news: News[] = [];
  pendingNews: News[] = [];
  // filteredNews: News;
  errorMessage: any;
  pageOfItems: Array<any>;
  imageBaseUrl = environment.baseImageUrl;

  constructor(private newsService : NewsService,
              private router: Router) { }

  ngOnInit() {
    this.newsService.getNews().subscribe(
      newsPage => {
        this.news = newsPage.data;
      },
      error => this.errorMessage = `Error: ${error}`
    );

  // cleaar error after 5s
  if(this.errorMessage) {
    setTimeout(()=>this.errorMessage = '', 5000)
  }
  }

  onChangePage(pageOfItems: Array<any>) {
      // update current page of items
      this.pageOfItems = pageOfItems;
  }

  // getFilteredNews(id: string) {
  //   this.filteredNews = this.news.find(news => news.id === id);
  // }

  deleteNews(id: string) {
    //deleting news
    this.newsService.deleteNews(id).subscribe(
      () => this.news = this.news.filter(newsArticle => newsArticle.id !== id)
    );
  }

  updateNews(id: string) {
    //navigate to update news page
    this.router.navigate(['admin/create-news',id])
  }

}
