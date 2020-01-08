import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { PageService } from 'src/app/services/page.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [PageService]
})
export class AboutPage {
  about: any;
  searchTerm: string;
  filteredNews: any = [];

  isShowSearchBar = false;

  constructor(public navCtrl: NavController, private pageService: PageService) {
    this.pageService.getItemById(2).subscribe(t => {
      this.about = t;
    });
  }
  onClickSearch() {
    this.isShowSearchBar = !this.isShowSearchBar;
  }
}
