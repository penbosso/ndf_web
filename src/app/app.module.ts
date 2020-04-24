import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SiteHeaderComponent } from './layout/site-header/site-header.component';
import { SiteFooterComponent } from './layout/site-footer/site-footer.component';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { CmsLayoutComponent } from './layout/cms-layout/cms-layout.component';
import { CmsHeaderComponent } from './layout/cms-header/cms-header.component';
import { from } from 'rxjs';

import { routing } from './app.routing';
import { NewsComponent } from './news/news.component';
import { CatalogComponent } from './catalog/catalog.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    SiteLayoutComponent,
    CmsLayoutComponent,
    CmsHeaderComponent,
    NewsComponent,
    CatalogComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
