import { Component, ViewChild } from '@angular/core';
import { NavController, IonInfiniteScroll } from '@ionic/angular';
import { CategoryService } from '../../services/categoty.service';
import { NavigationExtras } from '@angular/router';
import { ConfigData } from '../../services/config';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
  styleUrls: ['category.scss'],
  providers: [CategoryService]
})
export class CategoryPage {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  categories: any = [];
  categoryPageLoaded = 1;
  filteredNews: any = [];
  isShowSearchBar = false;
  searchTerm: string;

  constructor(
    public navCtrl: NavController,
    private categoryService: CategoryService,
    private domSanitizer: DomSanitizer) {
    this.loadCategories(null);
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.setFilteredCategories();
  }

  setFilteredCategories() {
    this.filteredNews = [];
    for (let i = 0; i < this.categories.length; i++) {
      const myCategories = JSON.stringify(this.categories[i]);
      if (this.searchTerm.length > 0) {
        if (myCategories.indexOf(this.searchTerm) !== -1) {

          this.filteredNews.push(this.categories[i]);
        }
      } else {
        this.filteredNews = this.categories;
      }
    }

  }

  openCategory(category) {
    const navigationExtras: NavigationExtras = {
      queryParams: { id: category.id }
    };
    this.navCtrl.navigateForward(['/recent-news'], navigationExtras);
  }

  getHtmlTitle(title) {
    if (title) {
      return this.domSanitizer.bypassSecurityTrustHtml(title);
    }
  }

  doInfinite(event) {
    this.loadCategories(event);
  }

  loadCategories(event) {
    this.categoryService
      .getCategories(this.categoryPageLoaded++)
      .subscribe((data: Array<any>) => {
        if (data) {
          const newData = data.filter(item => {
            if (item.count === 0) { return false; }
            if (!ConfigData.enableExcludeFromMenu) { return true; }
            return ConfigData.excludeFromMenu[item.id];
          });
          if (newData && newData.length > 0) {
            this.categories = this.categories.concat(newData);
            this.filteredNews = this.categories;
          }
        }
        if (event) {
          event.target.complete();
        }
      });
  }
  onClickSearch() {
    this.isShowSearchBar = !this.isShowSearchBar;
  }
}
