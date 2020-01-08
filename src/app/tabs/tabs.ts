import { Component } from '@angular/core';
import { HomePage } from '../pages/home/home';
import { CategoryPage } from '../pages/category/category';
import { AboutPage } from '../pages/about/about';
import { BookmarkPage } from '../pages/bookmark/bookmark';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = HomePage;
  tab2Root = CategoryPage;
  tab3Root = AboutPage;
  tab4Root = BookmarkPage;
  ramlaLink = JSON.stringify({
    id: 20,
    name: 'اللد والرملة'
  });
  reportsLink = JSON.stringify({
    id: 7,
    name: 'تقارير'
  });
  constructor() {
  }
}
