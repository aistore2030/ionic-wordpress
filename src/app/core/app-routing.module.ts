import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: '../tabs/tabs.module#TabsPageModule' },
  {
    path: 'settings',
    loadChildren: '../pages/settings/settings.module#SettingsPageModule'
  },
  {
    path: 'recent-news',
    loadChildren: '../pages/recent-news/recent-news.module#RecentNewsPageModule'
  },
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
    path: 'form-page',
    loadChildren: '../pages/form/form.module#FormPageModule'
  },
  {
    path: 'comment-page',
    loadChildren: '../pages/comments/comments.module#CommentsPageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
