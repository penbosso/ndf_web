import { NewsService } from './../../../news/news.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { News } from 'src/app/news/news';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})

export class CreateNewsComponent implements OnInit, OnDestroy {
  isPublished: boolean = false;
  showOverlay: boolean = false;
  newsForm: FormGroup;
  message: string = "";
  errorMessage: any;
  news = new News();
  base64Image: string;
  updateThisNews: News;
  private subscription: Subscription;
  imageBaseUrl = environment.baseImageUrl;

  constructor(
    private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.newsForm = this.fb.group({
      title: "",
      description: "",
      image: "",
      isPublished: false,
      consumer: "all"
    });

    this.subscription = this.route.paramMap.subscribe( params => {
      const id = params.get('id');
      if (id) {
        this.newsService.getNewsById(id).subscribe(
          newsArticle => {
            this.updateThisNews = newsArticle;
            this.isPublished = this.updateThisNews.isPublished;
            this.newsForm = this.fb.group({
              title: this.updateThisNews.title,
              description: this.updateThisNews.description,
              image: this.updateThisNews.image,
              isPublished: this.updateThisNews.isPublished,
              consumer: this.updateThisNews.consumer
            });
          },
          error => this.errorMessage = "An error occurred please try again later"
        );
      }
    });
  }

  save() {
    const newsArticle = {...this.news, ...this.newsForm.value}
    newsArticle.isPublished = this.isPublished;
    newsArticle.image = this.base64Image ? this.base64Image.replace(/^data:image\/[a-z]+;base64,/, "") : this.updateThisNews.image;
    this.showOverlay = true;
    // if update
    if (this.updateThisNews) {
      newsArticle.id = this.updateThisNews.id;
      console.log(newsArticle);
      this.newsService.updateNews(newsArticle).subscribe(
        () => this.onSaveComplete(),
        (error: any) => {
          this.errorMessage = "An error occurred please try again later";
          this.showOverlay = false;
        }
      );
    } else {
      this.newsService.saveNews(newsArticle).subscribe(
        () => this.onSaveComplete(),
        (error: any) => {
          this.errorMessage = "An error occurred please try again later";
          this.showOverlay = false;
        }
      );
    }

  // cleaar error after 5s
  if(this.errorMessage) {
    setTimeout(()=>this.errorMessage = '', 5000)
  }
  }

  toggleIsPublished() {
    this.isPublished ? this.isPublished = false : this.isPublished = true;
  }

  cancel() {
    this.newsForm.reset();
    this.base64Image = '';
  }

  onSaveComplete(): void {
    this.newsForm.reset();
    this.showOverlay = false;
    this.message = "News saved";
  }

  deleteNews(id: string) {
    this.newsService.deleteNews(id).subscribe(
      () => this.router.navigate(['/admin'])
    );
  }

  fileChangeEvent(fileInput: any) {
    this.errorMessage = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg', 'image/jpg'];

      if (fileInput.target.files[0].size > max_size) {
        this.errorMessage =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';

        return false;
      }

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
          this.errorMessage = 'Only Images are allowed ( JPG | PNG )';
          return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {
          const imgBase64Path = e.target.result;
          this.base64Image = imgBase64Path;
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
