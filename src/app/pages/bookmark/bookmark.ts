import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BookmarkService } from '../../services/bookmark.service';

@Component({
  selector: 'page-bookmark',
  templateUrl: 'bookmark.html',
  styleUrls: ['bookmark.scss'],
  providers: [BookmarkService]
})
export class BookmarkPage {
  posts: any = [];
  title: any = "Bookmark";

  searchTerm: string;
  filteredNews: any = [];

  isShowSearchBar = false;

  constructor(
    public navCtrl: NavController,
    private bookmarkService: BookmarkService) {
    this.loadBookmarks();
  }

  ngOnInit(){
    this.setFilteredBookmark();
  }

  setFilteredBookmark(){
    this.filteredNews = [];
    for(let i = 0; i < this.posts.length; i++){
      var myrecentPosts = JSON.stringify(this.posts[i]);
      if (this.searchTerm.length > 0) {
        if (myrecentPosts.indexOf(this.searchTerm) != -1){
        
          this.filteredNews.push(this.posts[i]);
          console.log("newRecentPosts", this.filteredNews);
        }
      }else{
        this.filteredNews = this.posts;
      }
    }

  }

  loadBookmarks() {
    let bookmarks = this.bookmarkService.getAllBookmark();
    this.posts = [];
    for (let item in bookmarks) {
      this.posts.push(bookmarks[item]);
      console.log("bookmark", this.posts);
    }
    this.filteredNews = this.posts;
    console.log("bookmark", this.posts);
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
