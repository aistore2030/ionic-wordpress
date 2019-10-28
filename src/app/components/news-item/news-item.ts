import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BookmarkService } from '../../services/bookmark.service';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'news-item',
  templateUrl: 'news-item.html',
  styleUrls: ['news-item.scss'],
  providers:[BookmarkService]
})

export class NewsItemPage implements OnChanges {
  @Input('data') data: any;
  @Output() onBookmark = new EventEmitter();
  @Output() onItemClick = new EventEmitter();
  
  constructor(private navCtrl: NavController, private bookmarkService: BookmarkService) {}

  ngOnChanges(changes: { [propKey: string]: any }) {
    this.data = changes['data'].currentValue;
  }

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
    this.onBookmark.emit(item);
  }

  openSinglePost(item) {
    const navigationExtras: NavigationExtras = {
      queryParams: { item: JSON.stringify(item) }
    };
    this.onItemClick.emit(item);
    this.navCtrl.navigateForward(['/single-page'], navigationExtras);
  }
}