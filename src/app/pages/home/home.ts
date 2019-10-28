import { AdMobFree } from '@ionic-native/admob-free/ngx';

import { Component, ViewChild } from '@angular/core';
import { NavController, IonInfiniteScroll } from '@ionic/angular';
import { CategoryService } from '../../services/categoty.service';
import { SyncService } from '../../services/sync.service';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { MediaService } from '../../services/media.service';
import { BookmarkService } from '../../services/bookmark.service';
import { NavigationExtras } from '@angular/router';
import { ConfigData } from '../../services/config';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss'],
  providers: [CategoryService, UserService, SyncService,
    PostService, MediaService, BookmarkService, AdMobFree
  ]
})
export class HomePage {

  
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  categories: any = [];
  posts: any = [];
  postsRecentNews: any = [];
  selectedCategory: any;
  selectedItem: any;
  postPageLoaded = 1;

  searchTerm: string;
  filteredNews: any = [];

  isShowSearchBar = false;

  constructor(
    private admobFree: AdMobFree,
    public navCtrl: NavController,
    private domSanitizer: DomSanitizer,
    private syncService: SyncService,
    private categoryService: CategoryService,
    private postService: PostService,
    private mediaService: MediaService,
    private bookmarkService: BookmarkService) {
      
      this.postPageLoaded = 1;
      this.showBannerAds();

      this.syncService.sync().subscribe(data => {
        this.categoryService.getCategories(1).subscribe((data: Array<any>) => {
          if (!data) {
            return
          }
          this.categories = data.filter(item => {
            if (item.count == 0) return false
            if (!ConfigData.enableExcludeFromMenu) return true
            return ConfigData.excludeFromMenu[item.name.toLocaleLowerCase()]
          });
          if (this.categories && this.categories.length > 0) {
            this.refreshData(this.categories[0])
          }
        });
      });
  }
  ngOnInit(){
    this.setFilteredPosts();
  }

  setFilteredPosts(){
    this.filteredNews = [];
    for(let i = 0; i < this.postsRecentNews.length; i++){
      var myrecentPosts = JSON.stringify(this.postsRecentNews[i]);
      if (this.searchTerm.length > 0) {
        if (myrecentPosts.indexOf(this.searchTerm) != -1){
        
          this.filteredNews.push(this.postsRecentNews[i]);
          console.log("newRecentPosts", this.filteredNews);
        }
      }else{
        this.filteredNews = this.postsRecentNews;
      }
    }

  }

  showBannerAds() {
    if (!ConfigData.bannerAds.enable) {
      return;
    }
    this.admobFree.banner.config(ConfigData.bannerAds.config);
    this.admobFree.banner.prepare();
  }

  getHtmlTitle(title) {
    if (title) {
      return this.domSanitizer.bypassSecurityTrustHtml(title)
    }
  }
  
  refreshData(category) {
    this.selectedItem = category.name;
    this.selectedCategory = category;
    this.postsRecentNews = [];
    this.posts = [];
    this.postPageLoaded = 1;
    this.loadData(category.id, null);
  }

  loadData(categoryId, event) {
    this.postService.getPostListWithFilter(categoryId, this.postPageLoaded++).subscribe((data: Array<any>) => {
      // console.log("postService", this.postService);
      if (this.posts && this.posts.length == 0) {
        this.posts = data.slice(0, 3);
        if (data.length > 3) {
            this.postsRecentNews = this.postsRecentNews.concat(data.slice(3, data.length));
            this.filteredNews = this.postsRecentNews;
            console.log("postsRecentNews1", this.postsRecentNews);
        }
      } else {
        this.postsRecentNews = this.postsRecentNews.concat(data);
        this.filteredNews = this.postsRecentNews;
        console.log("postsRecentNews2", this.postsRecentNews);
      }

      if (event) {
        event.target.complete();
      }

      this.posts.forEach(element => {
        element.bookmark = this.bookmarkService[element.id] ? true : false
        if (element.mediaId) {
          this.mediaService.getItemById(element.mediaId).subscribe(media => {
            this.posts.forEach(element => {
              if (media['id'] === element['mediaId']) {
                element.image = media['source_url'];
              }
            });
          });
        }
      });

      this.postsRecentNews.forEach(element => {
        element.bookmark = this.bookmarkService[element.id] ? true : false
        if (element.mediaId) {
          this.mediaService.getItemById(element.mediaId).subscribe(media => {
            this.postsRecentNews.forEach(element => {
              if (media['id'] === element['mediaId']) {
                element.image = media['source_url'];
              }
            });
          });
        }
      });
    })
  }

  

  doInfinite(event) {
    this.loadData(this.selectedCategory.id, event);
  }

  openSinglePost(item) {
    const navigationExtras: NavigationExtras = {
      queryParams: { item: JSON.stringify(item) }
    };
    this.navCtrl.navigateForward(['/single-page'], navigationExtras);
  }

  bookmark = (item, e) => {
    if (e) {
      e.stopPropagation();
    }
    if (item.bookmark) {
      item.bookmark = false;
      this.bookmarkService.delete(item);
    } else {
      item.bookmark = true;
      this.bookmarkService.save(item);
    }
  }

  onClickSearch() { 
    this.isShowSearchBar = !this.isShowSearchBar;
  }


}
