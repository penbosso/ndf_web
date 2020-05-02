import { VendorHomeComponent } from './cms/vendor-home/vendor-home.component';
import { NewsComponent } from './news/news.component';
import { HomeComponent } from './home/home.component';
import { CmsLayoutComponent } from './layout/cms-layout/cms-layout.component';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import {Routes, RouterModule } from '@angular/router'
import { CatalogComponent } from './catalog/catalog.component';


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
      {path:'vendor', component: VendorHomeComponent}
    ]
  },

  // no layout routes goes here


  // otherwise redirect to home
  {path: '**', redirectTo: ''}
]


export const routing = RouterModule.forRoot(appRoutes);
