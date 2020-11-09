import { PendingStockComponent } from 'src/app/shared/pending-stock/pending-stock.component';
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
import { VendorHomeComponent } from './cms/vendor/vendor-home/vendor-home.component';
import { AdminHomeComponent } from './cms/admin/admin-home/admin-home.component';
import { CmsFooterComponent } from './layout/cms-footer/cms-footer.component';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './login/auth.service';
import { AuthInterceptor } from './login/auth.interceptor';
import { AuthGuard } from './login/auth.guard';
import { ManageStockComponent } from './cms/vendor/stock/manage-stock/manage-stock.component';
import { AddStockComponent } from './cms/vendor/stock/add-stock/add-stock.component';
import { VendorNewsComponent } from './cms/vendor/vendor-news/vendor-news.component';
import { VendorViewNewsComponent } from './cms/vendor/vendor-news/vendor-view-news/vendor-view-news.component';
import { AdminHeaderComponent } from './layout/admin-header/admin-header.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AdminLoginComponent } from './login/admin-login.component';
import { CreateNewsComponent } from './cms/admin/create-news/create-news.component';
import { ShowVendorComponent } from './cms/admin/show-vendor/show-vendor.component';
import { AdminViewNewsComponent } from './cms/admin/admin-view-news/admin-view-news.component';
import { ViewVendorComponent } from './cms/admin/view-vendor/view-vendor.component';
import { UploadExcelComponent } from './cms/admin/upload-excel/upload-excel.component';
import { ManageNewsComponent } from './cms/admin/manage-news/manage-news.component';
import { EditorModule } from "@tinymce/tinymce-angular";
import { AvailableStockComponent } from './shared/available-stock/available-stock.component';
import { NewsArticleComponent } from './news/news-article/news-article.component';
import { Page404Component } from './page404/page404.component';
import { ProfileComponent } from './user/profile/profile.component';
import { JwPaginationComponent } from 'jw-angular-pagination';
import { TermsConditionsComponent } from './signup/terms-conditions/terms-conditions.component';
import { PrivacyComponent } from './signup/privacy/privacy.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AddAdminComponent } from './cms/admin/add-admin/add-admin.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { DeclindedStockComponent } from './shared/declinded-stock/declinded-stock.component';
import { FeedbackListComponent } from './cms/admin/feedback-list/feedback-list.component';
import { ViewSignedupVendorsComponent } from './cms/admin/view-signedup-vendors/view-signedup-vendors.component';
import { ViewActivityComponent } from './cms/admin/view-activity/view-activity.component';
import { BlockUserComponent } from './cms/admin/block-user/block-user.component';
import { ForgotComponent } from './login/forgot/forgot.component';
import { ResetComponent } from './login/reset/reset.component';

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
    VendorViewNewsComponent,
    AdminHeaderComponent,
    AdminLayoutComponent,
    AdminLoginComponent,
    CreateNewsComponent,
    ShowVendorComponent,
    AdminViewNewsComponent,
    ViewVendorComponent,
    UploadExcelComponent,
    ManageNewsComponent,
    AvailableStockComponent,
    NewsArticleComponent,
    Page404Component,
    ProfileComponent,
    JwPaginationComponent,
    TermsConditionsComponent,
    PrivacyComponent,
    PendingStockComponent,
    FeedbackComponent,
    AddAdminComponent,
    DeclindedStockComponent,
    FeedbackListComponent,
    ViewSignedupVendorsComponent,
    ViewActivityComponent,
    BlockUserComponent,
    ForgotComponent,
    ResetComponent
  ],
  imports: [
    BrowserModule,
    EditorModule,
    HttpClientModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
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
