import { Component, OnInit } from '@angular/core';
import { News } from '../news';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewsService } from '../news.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news-article',
  templateUrl: './news-article.component.html',
  styleUrls: ['./news-article.component.css']
})
export class NewsArticleComponent implements OnInit {
  newsArticle: News;
  private subscription: Subscription;
  errorMessage: any;
  previousUrl: string;
  imageBaseUrl = environment.baseImageUrl;

  constructor(private newsService : NewsService,
              private route: ActivatedRoute ) { }

  ngOnInit() {

    this.subscription = this.route.paramMap.subscribe( params => {
      const id = params.get('id');
      this.newsService.getNewsById(id).subscribe(
        news => {
          this.newsArticle = news;
        },
        error => this.errorMessage = `Error: ${error}`
      );
    });
    // cleaar error after 5s
    if(this.errorMessage) {
      setTimeout(()=>this.errorMessage = '', 5000)
    }
  }

  back() {
    // if (this.previousUrl) {
    //   this.router.navigate([this.previousUrl])
    // }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
