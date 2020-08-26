import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/news/news';
import { environment } from 'src/environments/environment';
import { NewsService } from 'src/app/news/news.service';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-vendor-news',
  templateUrl: './vendor-news.component.html',
  styleUrls: ['./vendor-news.component.css']
})
export class VendorNewsComponent implements OnInit {
  _listFilter: string;
  news: News[] = [];
  filteredNews: News[];
  errorMessage: any;
  pageOfItems: Array<any>;
  imageBaseUrl = environment.baseImageUrl;


  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredNews = this.listFilter ? this.performFilter(this.listFilter) : this.news;
  }
  constructor(private newsService : NewsService) { }

  ngOnInit() {
    this.newsService.getPublishedNews().subscribe(
      newsPage => {
        this.news = newsPage.data;
        this.filteredNews = this.news;
      },
      error => this.errorMessage = "An error occurred please try again later"
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

  performFilter(listFilter: string): any {
    const options = {
      keys: [
        "title",
        "description"
      ]
    };

    let fuse  = new Fuse(this.news, options);
    return fuse.search(listFilter);
  }

}
