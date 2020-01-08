import { AdMobFree } from '@ionic-native/admob-free/ngx';

import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, NavController } from '@ionic/angular';
import { CategoryService } from '../../services/categoty.service';
import { SyncService } from '../../services/sync.service';
import { UserService } from '../../services/user.service';
import { PostService } from '../../services/post.service';
import { MediaService } from '../../services/media.service';
import { BookmarkService } from '../../services/bookmark.service';
import { NavigationExtras } from '@angular/router';
import { ConfigData } from '../../services/config';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';

import {
  SUN,
  THUNDER,
  CLOUD,
  DRIZZLE,
  RAIN,
  SNOW
} from '../../services/constants/weatherIconState';
import { WeatherProvider } from 'src/app/services/weather.service';
import { transformForecast } from 'src/app/services/transformWeather';
import { Slides } from 'ionic-angular';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['home.scss'],
  providers: [
    CategoryService,
    UserService,
    SyncService,
    PostService,
    MediaService,
    BookmarkService,
    AdMobFree,
    WeatherProvider
  ]
})
export class HomePage {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild('wizardSlider') slideWithNav: Slides;
  categories: any = [];
  posts: any = [];
  postsRecentNews: any = [];
  selectedCategory: any;
  selectedItem: any;
  postPageLoaded = 1;

  searchTerm: string;
  filteredNews: any = [];

  isShowSearchBar = false;
  isInfiniteScrollActive = true;

  allCatNews = [];
  newBar = [];

  icons = {
    [CLOUD]: 'cloud',
    [SUN]: 'day-sunny',
    [RAIN]: 'rain',
    [SNOW]: 'snow',
    [THUNDER]: 'day-thunderstorm',
    [DRIZZLE]: 'day-showers'
  };

  forecastData;
  forecastList;
  currentDay;
  currentDate = new Date();

  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 1000
  };
  sliderOne: any;

  constructor(
    private admobFree: AdMobFree,
    public navCtrl: NavController,
    private domSanitizer: DomSanitizer,
    private postService: PostService,
    private mediaService: MediaService,
    private bookmarkService: BookmarkService,
    private weatherApi: WeatherProvider,
    private storage: Storage,
    private categoryService: CategoryService
  ) {

  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    // this.setFilteredPosts();
    this.postPageLoaded = 1;
    // this.showBannerAds();
    this.buildCatNews();
    this.buildWeather();
  }

  buildWeather() {
    this.weatherApi.query('forecast', { id: 294640, units: 'metric' })
      .subscribe(async cityDetails => {
        this.forecastData = cityDetails;
        this.forecastList = transformForecast(this.forecastData);
        this.currentDay = this.forecastList.shift();
        console.log(this.forecastList);
      });
  }

  doRefresh(event) {
    console.log('Begin async operation');
    setTimeout(() => {
      console.log('Async operation has ended');
      this.buildCatNews();
      this.buildWeather();
      event.target.complete();
    }, 2000);
  }

  openCat(cat) {
    const navigationExtras: NavigationExtras = {
      queryParams: { item: JSON.stringify(cat) }
    };
    this.navCtrl.navigateForward(['/tabs/page-category-news'], navigationExtras);
  }

  getCategories() {
    return this.categoryService.getCategories(1).subscribe((data: Array<any>) => {
      if (!data) {
        return;
      }
      const categories = data.filter(item => {
        if (item.count === 0) {
          return false;
        }
        if (!ConfigData.enableExcludeFromMenu) {
          return true;
        }
        return ConfigData.excludeFromMenu[item.id];
      });
      categories.unshift({ id: -1, name: 'الرئيسية', orderIndex: 0 });

      const storeItems = [];

      categories.forEach(element => {
        element.orderIndex = ConfigData.orderedMenu[element.id] ? ConfigData.orderedMenu[element.id] : 0;
        storeItems.push(element);
      });

      categories.sort((a, b) => {
        return a.orderIndex - b.orderIndex;
      });

      this.storage.set('category', JSON.stringify(storeItems));
      return categories;
    });
  }

  buildCatNews() {
    this.allCatNews = [];
    this.posts = [];
    this.newBar = [];

    this.sliderOne = {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: []
    };

    this.storage.get('category').then(t => {
      if (t) {
        this.categories = JSON.parse(t);
        if (this.categories.length > 0) {
          // this.refreshData(this.categories[0]);
          this.categories.forEach(async element => {
            (await this.postService
              .getPostListWithFilter(element.id !== -1 ? element.id : null, 1, 5))
              .subscribe((data: Array<any>) => {
                if (element.id === -1 && this.newBar.length === 0) {
                  this.newBar = data;
                }
                data.forEach(e => {
                  if (e.mediaId && e.image === '') {
                    this.mediaService.getItemById(e.mediaId).subscribe(media => {
                      if (media['id'] === e['mediaId']) {
                        e.image = media['source_url'];
                      }
                    });
                  }
                });

                if (element.id === -1 && this.posts.length === 0) {
                  this.posts = data.slice(0, 3);
                  this.sliderOne = {
                    isBeginningSlide: true,
                    isEndSlide: false,
                    slidesItems: this.posts
                  };
                }
                if (data.length > 2) {
                  this.allCatNews.push({ category: element, news: data.slice(0, 2), orderIndex: element.orderIndex });
                } else {
                  this.allCatNews.push({ category: element, news: data, orderIndex: element.orderIndex });
                }

                this.allCatNews.sort((a, b) => {
                  return a.orderIndex - b.orderIndex;
                });

              });
          });
          console.log(this.allCatNews);
        }
      } else {
        this.categoryService.getCategories(1).subscribe((data: Array<any>) => {
          if (!data) {
            return;
          }
          const categories = data.filter(item => {
            if (item.count === 0) {
              return false;
            }
            if (!ConfigData.enableExcludeFromMenu) {
              return true;
            }
            return ConfigData.excludeFromMenu[item.id];
          });
          categories.unshift({ id: -1, name: 'الرئيسية', orderIndex: 0 });

          const storeItems = [];

          categories.forEach(element => {
            element.orderIndex = ConfigData.orderedMenu[element.id] ? ConfigData.orderedMenu[element.id] : 0;
            storeItems.push(element);
          });

          categories.sort((a, b) => {
            return a.orderIndex - b.orderIndex;
          });

          this.storage.set('category', JSON.stringify(storeItems));

          if (this.categories.length > 0) {
            // this.refreshData(this.categories[0]);
            this.categories.forEach(async element => {
              (await this.postService
                .getPostListWithFilter(element.id !== -1 ? element.id : null, 1, 5))
                .subscribe((data: Array<any>) => {
                  if (element.id === -1 && this.newBar.length === 0) {
                    this.newBar = data;
                  }
                  data.forEach(e => {
                    if (e.mediaId && (e.image === '' || e == null)) {
                      this.mediaService.getItemById(e.mediaId).subscribe(media => {
                        if (media['id'] === e['mediaId']) {
                          e.image = media['source_url'];
                        }
                      });
                    }
                  });

                  if (element.id === -1 && this.posts.length === 0) {
                    this.posts = data.slice(0, 3);
                    this.sliderOne = {
                      isBeginningSlide: true,
                      isEndSlide: false,
                      slidesItems: this.posts
                    };
                  }
                  if (data.length > 2) {
                    this.allCatNews.push({ category: element, news: data.slice(0, 2), orderIndex: element.orderIndex });
                  } else {
                    this.allCatNews.push({ category: element, news: data, orderIndex: element.orderIndex });
                  }

                  this.allCatNews.sort((a, b) => {
                    return a.orderIndex - b.orderIndex;
                  });

                });
            });
            console.log(this.allCatNews);
          }
        });
      }
    });
  }

  setFilteredPosts() {
    this.filteredNews = [];
    for (let i = 0; i < this.postsRecentNews.length; i++) {
      const myrecentPosts = JSON.stringify(this.postsRecentNews[i]);
      if (this.searchTerm.length > 0) {
        if (myrecentPosts.indexOf(this.searchTerm) !== -1) {
          this.filteredNews.push(this.postsRecentNews[i]);
          console.log('newRecentPosts', this.filteredNews);
        }
      } else {
        this.filteredNews = this.postsRecentNews;
      }
    }
  }

  // Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  // Call methods to check if slide is first or last to enable disbale navigation
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
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
      return this.domSanitizer.bypassSecurityTrustHtml(title);
    }
  }

  refreshData(category) {
    this.selectedItem = category.name;
    this.selectedCategory = category;
    this.postsRecentNews = [];
    this.posts = [];
    this.postPageLoaded = 1;
    this.loadData(category, null);
  }

  getWeatherIconClass(weatherState) {
    return this.icons[weatherState];
  }

  getWeatherIcon(weatherState) {
    return `wi-${this.getWeatherIconClass(weatherState.weatherState)}`;
  }

  async loadData(category, event) {
    (await this.postService
      .getPostListWithFilter(category.id !== -1 ? category.id : null, this.postPageLoaded++))
      .subscribe((data: Array<any>) => {
        if (data.length < 10) {
          this.isInfiniteScrollActive = false;
        }
        if (this.posts && this.posts.length === 0) {
          this.posts = data.slice(0, 3);
          if (data.length > 3) {
            this.postsRecentNews = this.postsRecentNews.concat(
              data.slice(3, data.length)
            );
            this.filteredNews = this.postsRecentNews;
            console.log('postsRecentNews1', this.postsRecentNews);
          }
        } else {
          this.postsRecentNews = this.postsRecentNews.concat(data);
          this.filteredNews = this.postsRecentNews;
          console.log('postsRecentNews2', this.postsRecentNews);
        }

        if (event) {
          event.target.complete();
        }

        this.posts.forEach(element => {
          element.bookmark = this.bookmarkService[element.id] ? true : false;
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
          element.bookmark = this.bookmarkService[element.id] ? true : false;
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
      });
  }

  doInfinite(event) {
    if (this.isInfiniteScrollActive) {
      this.loadData(this.selectedCategory, event);
    } else {
      event.target.complete();
    }
  }

  openSinglePost(item) {
    const navigationExtras: NavigationExtras = {
      queryParams: { item: JSON.stringify(item) }
    };
    this.navCtrl.navigateForward(['/single-page'], navigationExtras);
  }

  bookmark(item, e) {
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
