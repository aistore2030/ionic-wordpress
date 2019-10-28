import { Component, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BookmarkService } from '../../services/bookmark.service';
import { NavigationExtras } from '@angular/router';


@Component({
  selector: 'news-item-home',
  templateUrl: 'news-item-home.html',
  styleUrls: ['news-item-home.scss'],
  providers:[BookmarkService]
})

export class NewsItemHomePage {
  @Input('data') data: any;

  constructor(private navCtrl: NavController, private bookmarkService: BookmarkService) {}

  bookmark = (item, event) => {
    if (event) {
      event.stopPropagation();
    }
    if (item.bookmark) {
      item.bookmark = false;
      this.bookmarkService.delete(item);
    } else {
      item.bookmark = true;
      this.bookmarkService.save(item);
    }
  }

  openSinglePost(item) {
    const navigationExtras: NavigationExtras = {
      queryParams: { item: JSON.stringify(item) }
    };
    this.navCtrl.navigateForward(['/single-page'], navigationExtras);
  }
}
