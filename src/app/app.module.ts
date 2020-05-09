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
import { VendorHomeComponent } from './cms/vendor-home/vendor-home.component';
import { AdminHomeComponent } from './cms/admin-home/admin-home.component';
import { CmsFooterComponent } from './layout/cms-footer/cms-footer.component';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './login/auth.service';
import { AuthInterceptor } from './login/auth.interceptor';
import { AuthGuard } from './login/auth.guard';
import { ManageStockComponent } from './cms/stock/manage-stock/manage-stock.component';
import { AddStockComponent } from './cms/stock/add-stock/add-stock.component';
import { VendorNewsComponent } from './cms/vendor-news/vendor-news.component';
import { VendorViewNewsComponent } from './cms/vendor-news/vendor-view-news/vendor-view-news.component';
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
    CatalogComponent,
    VendorHomeComponent,
    AdminHomeComponent,
    CmsFooterComponent,
    UserComponent,
    LoginComponent,
    SignupComponent,
    ManageStockComponent,
    AddStockComponent,
    VendorNewsComponent,
    VendorViewNewsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    routing
  ],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
