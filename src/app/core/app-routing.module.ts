import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: '../pages/home/home.module#HomePageModule'
  },
  {
    path: 'category',
    loadChildren: '../pages/category/category.module#CategoryPageModule'
  },
  {
    path: 'bookmark',
    loadChildren: '../pages/bookmark/bookmark.module#BookmarkPageModule'
  },
  {
    path: 'about',
    loadChildren: '../pages/about/about.module#AboutPageModule'
  },
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
    path: 'form-page',
    loadChildren: '../pages/form/form.module#FormPageModule'
  },
  {
    path: 'comment-page',
    loadChildren: '../pages/comments/comments.module#CommentsPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
