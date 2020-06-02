import { VendorGuard } from './user/vendor.guard';
import { ShowVendorComponent } from './cms/admin/show-vendor/show-vendor.component';
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
import { ManageNewsComponent } from './cms/admin/manage-news/manage-news.component';


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
    path:'vendor',
    canActivate: [AuthGuard, VendorGuard],
    component: CmsLayoutComponent,
    children: [
      {path:'', component: VendorHomeComponent},
      {path:'add-stock', component: AddStockComponent},
      {path:'add-stock/:id', component: AddStockComponent},
      {path:'manage-stock', component: ManageStockComponent},
      {path:'news', component: VendorNewsComponent},
      {path:'view-news/:id', component: VendorViewNewsComponent}
    ]
  },

  // cms routes goes here
  {
    path:'admin',
    component: AdminLayoutComponent,
    children: [
      {path:'', canActivate: [AuthGuard], component: AdminHomeComponent},
      {path:'create-news', canActivate: [AuthGuard], component: CreateNewsComponent},
      {path:'create-news/:id', canActivate: [AuthGuard], component: CreateNewsComponent},
      {path:'view-news', canActivate: [AuthGuard], component: AdminViewNewsComponent},
      {path:'view-news/:id', canActivate: [AuthGuard], component: VendorViewNewsComponent},
      {path:'manage-news/:id', canActivate: [AuthGuard], component: AdminViewNewsComponent},
      {path:'view-vendor/:code', canActivate: [AuthGuard], component: ViewVendorComponent},
      {path:'upload-excel', canActivate: [AuthGuard], component: UploadExcelComponent},
      {path:'show-vendors', canActivate: [AuthGuard], component: ShowVendorComponent}
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
