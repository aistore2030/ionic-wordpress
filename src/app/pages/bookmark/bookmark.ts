import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BookmarkService } from '../../services/bookmark.service';

@Component({
  selector: 'page-bookmark',
  templateUrl: 'bookmark.html',
  styleUrls: ['bookmark.scss'],
  providers: [BookmarkService]
})
export class BookmarkPage implements OnInit {
  posts: any = [];
  title: any = 'Bookmark';

  searchTerm = '';
  filteredNews: any = [];

  isShowSearchBar = false;

  constructor(
    public navCtrl: NavController,
    private bookmarkService: BookmarkService
  ) {
    this.loadBookmarks();
  }

  ngOnInit() {
    this.setFilteredBookmark();
  }

  setFilteredBookmark() {
    this.filteredNews = [];
    for (let i = 0; i < this.posts.length; i++) {
      const myrecentPosts = JSON.stringify(this.posts[i]);
      if (this.searchTerm.length > 0) {
        if (myrecentPosts.indexOf(this.searchTerm) !== -1) {
          this.filteredNews.push(this.posts[i]);
        }
      } else {
        this.filteredNews = this.posts;
      }
    }
  }

  loadBookmarks() {
    this.bookmarkService.getAllBookmark().then(t => {
      const bookmarks = t;
      this.posts = [];
      // tslint:disable-next-line:forin
      for (const item in bookmarks) {
        this.posts.push(bookmarks[item]);
      }
      this.filteredNews = this.posts;
    });
  }

  clearAll() {
    this.bookmarkService.clearAll();
    this.loadBookmarks();
  }

  ionViewWillEnter() {
    this.loadBookmarks();
  }

  onBookmark(item) {
    this.bookmarkService.delete(item);
    this.loadBookmarks();
  }
  onClickSearch() {
    this.isShowSearchBar = !this.isShowSearchBar;
  }
}
