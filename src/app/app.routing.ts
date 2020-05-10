import { UploadExcelComponent } from './cms/admin/upload-excel/upload-excel.component';
import { ViewVendorComponent } from './cms/admin/view-vendor/view-vendor.component';
import { AdminViewNewsComponent } from './cms/admin/admin-view-news/admin-view-news.component';
import { CreateNewsComponent } from './cms/admin/create-news/create-news.component';
import { AdminLoginComponent } from './login/admin-login.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { VendorViewNewsComponent } from './cms/vendor/vendor-news/vendor-view-news/vendor-view-news.component';
import { AddStockComponent } from './cms/vendor/stock/add-stock/add-stock.component';
import { VendorNewsComponent } from './cms/vendor/vendor-news/vendor-news.component';
import { ManageStockComponent } from './cms/vendor/stock/manage-stock/manage-stock.component';
import { LoginComponent } from './login/login.component';
import { VendorHomeComponent } from './cms/vendor/vendor-home/vendor-home.component';
import { NewsComponent } from './news/news.component';
import { HomeComponent } from './home/home.component';
import { CmsLayoutComponent } from './layout/cms-layout/cms-layout.component';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import {Routes, RouterModule } from '@angular/router'
import { CatalogComponent } from './catalog/catalog.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './login/auth.guard';
import { AdminHomeComponent } from './cms/admin/admin-home/admin-home.component';


const appRoutes: Routes = [
  // site routes here
  {
    path:'',
    component: SiteLayoutComponent,
    children: [
      { path:'', component: HomeComponent, pathMatch: 'full'},
      { path:'catalog', component: CatalogComponent},
      { path:'news', component: NewsComponent},
    ]
  },

  // cms routes goes here
  {
    path:'',
    component: CmsLayoutComponent,
    children: [
      {path:'vendor', canActivate: [AuthGuard], component: VendorHomeComponent},
      {path:'vendor/add-stock', canActivate: [AuthGuard], component: AddStockComponent},
      {path:'vendor/manage-stock', canActivate: [AuthGuard], component: ManageStockComponent},
      {path:'vendor/news', canActivate: [AuthGuard], component: VendorNewsComponent},
      {path:'vendor/view-news', canActivate: [AuthGuard], component: VendorViewNewsComponent}
    ]
  },

  // cms routes goes here
  {
    path:'',
    component: AdminLayoutComponent,
    children: [
      {path:'admin', canActivate: [AuthGuard], component: AdminHomeComponent},
      {path:'admin/create-news', canActivate: [AuthGuard], component: CreateNewsComponent},
      {path:'admin/view-news', canActivate: [AuthGuard], component: AdminViewNewsComponent},
      {path:'admin/manage-news', canActivate: [AuthGuard], component: AdminViewNewsComponent},
      {path:'admin/view-vendor', canActivate: [AuthGuard], component: ViewVendorComponent},
      {path:'admin/upload-excel', canActivate: [AuthGuard], component: UploadExcelComponent},
      {path:'admin/show-vendors', canActivate: [AuthGuard], component: VendorViewNewsComponent}
    ]
  },

  // no layout routes goes here
  {path:'admin/login', component: AdminLoginComponent},
  {path:'vendor/login', component: LoginComponent},
  {path:'vendor/signup', component: SignupComponent},

  {path: 'login', redirectTo: 'vendor/login'},
  {path: 'signup', redirectTo: 'vendor/signup'},
  // otherwise redirect to home
  {path: '**', redirectTo: ''}
]


export const routing = RouterModule.forRoot(appRoutes);
