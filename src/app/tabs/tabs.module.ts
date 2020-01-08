import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs';
import { SharedModule } from '../components/shared.module';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'home', loadChildren: '../pages/home/home.module#HomePageModule' },
      { path: 'category', loadChildren: '../pages/category/category.module#CategoryPageModule' },
      { path: 'about', loadChildren: '../pages/about/about.module#AboutPageModule' },
      { path: 'bookmark', loadChildren: '../pages/bookmark/bookmark.module#BookmarkPageModule' },
      {
        path: 'recent-news',
        loadChildren: '../pages/recent-news/recent-news.module#RecentNewsPageModule'
      },
      {
        path: 'single-page',
        loadChildren: '../pages/single-page/single-page.module#SinglePageModule'
      },
      {
        path: 'page-category-news',
        loadChildren: '../pages/category-news/category-news.module#CategoryNewsPageModule'
      },
      {
        path: 'ramla',
        loadChildren: '../pages/ramla-news/ramla-news.module#RamlaNewsPageModule'
      },
      {
        path: 'reports',
        loadChildren: '../pages/report-news/report-news.module#ReportNewsPageModule'
      },
      {
        path: 'contact',
        loadChildren: '../pages/contact/contact.module#ContactPageModule'
      },
      {
        path: 'form-page',
        loadChildren: '../pages/form/form.module#FormPageModule'
      },
      {
        path: 'comment-page',
        loadChildren: '../pages/comments/comments.module#CommentsPageModule'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TabsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TabsPageModule { }
