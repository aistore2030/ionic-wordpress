import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers: [AboutService]
})
export class AboutPage {
  about: any;
  searchTerm: string;
  filteredNews: any = [];

  isShowSearchBar = false;

  constructor(public navCtrl: NavController, private aboutService: AboutService) {
    this.about = this.aboutService.getAboutInformation();
  }
  onClickSearch() { 
    this.isShowSearchBar = !this.isShowSearchBar;
  }
}
