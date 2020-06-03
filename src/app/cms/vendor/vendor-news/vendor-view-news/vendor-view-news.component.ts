import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewsService } from 'src/app/news/news.service';
import { ActivatedRoute} from '@angular/router';
import { News } from 'src/app/news/news';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vendor-view-news',
  templateUrl: './vendor-view-news.component.html',
  styleUrls: ['./vendor-view-news.component.css']
})
export class VendorViewNewsComponent implements OnInit, OnDestroy {
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
        error => this.errorMessage = <any> error
      );
    });
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
