import { Component } from '@angular/core';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal/ngx';
import { NavController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ConfigData } from '../services/config';
import { Platform } from 'ionic-angular';
import { BookmarkService } from '../services/bookmark.service';
import { isCordovaAvailable } from '../common/is-cordova-available';
import { SyncService } from '../services/sync.service';
import { CategoryService } from '../services/categoty.service';
import { NavigationExtras } from '@angular/router';
import * as moment from 'moment/min/moment-with-locales';
import { Storage } from '@ionic/storage';
import { PostService } from '../services/post.service';
import { MediaService } from '../services/media.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [];
  headerMenuItem = {};

  rootPage: any = 'HomePage';
  pages: Array<{ title: string; component: any; icon: string; url: string }>;
  isPushNotificationEnabled = true;
  categories: any = [];

  constructor(
    public oneSignal: OneSignal,
    public navController: NavController,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    public bookmark: BookmarkService,
    private postService: PostService,
    private categoryService: CategoryService,
    private storage: Storage,
    public mediaService: MediaService
  ) {
    moment.locale('ar-sa', {
      postformat: function (string) {
        return string.replace(/\d/g, function (match) {
          return match;
        }).replace(/,/g, '،');
      }
    });
    this.initializeApp();
    this.getCategories();
    // Change Color StatusBar
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'الرئيسيه', component: 'HomePage', icon: 'book', url: 'home' },
      {
        title: 'الأقسام',
        component: 'CategoryPage',
        icon: 'list-box',
        url: 'category'
      },
      {
        title: 'المفضله',
        component: 'BookmarkPage',
        icon: 'bookmark',
        url: 'bookmark'
      },
      {
        title: 'معلومات عنا',
        component: 'AboutPage',
        icon: 'ios-flag',
        url: 'about'
      },
      {
        title: 'الأعدادات',
        component: 'settings',
        icon: 'settings',
        url: 'settings'
      }
    ];

  }

  initializeApp() {
    console.log('hello');
    if (isCordovaAvailable()) {
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    }
  }

  async onDeviceReady() {
    const self = this;
    console.log('hello');
    window['plugins'].OneSignal.startInit(
      ConfigData.oneSignal.appID,
      ConfigData.oneSignal.googleProjectId
    );
    window['plugins'].OneSignal.inFocusDisplaying(
      window['plugins'].OneSignal.OSInFocusDisplayOption.Notification
    );

    window['plugins'].OneSignal.handleNotificationReceived(
      // notificationOpenedCallback
    );
    window['plugins'].OneSignal.handleNotificationOpened(
      self.notificationOpenedCallback
    );
    // window['plugins'].OneSignal.setSubscription(
    //   self.isPushNotificationEnabled
    // );
    window['plugins'].OneSignal.endInit();
  }

  notificationOpenedCallback(jsonData) {
    this.storage.get('category').then(t => {
      const categories = JSON.parse(t);
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData.notification.payload.additionalData.post));
      if (jsonData.notification.payload.additionalData.post) {
        this.postService.getItemById(jsonData.notification.payload.additionalData.post).subscribe(p => {
          const data: any = p;
          const cat = data.categories && data.categories.length
            ? categories.find(c => c.id === data.categories[0] || c.id === data.categories[1]) : null;
          const post = {
            'category': cat ? cat.name : '',
            'categoryId': data.categories[0],
            'title': data.title.rendered,
            'time': data.date,
            'image': '',
            'id': data.id,
            'link': data.link,
            'content': data.content.rendered,
            'mediaId': data.featured_media
          };

          if (post.mediaId && post.image === '') {
            this.mediaService.getItemById(post.mediaId).subscribe(media => {
              if (media['id'] === post['mediaId']) {
                post.image = media['source_url'];
              }
              console.log(post);
              const navigationExtras: NavigationExtras = {
                queryParams: { item: JSON.stringify(post) }
              };
              this.navController.navigateForward(['/single-page'], navigationExtras);
            });
          } else {
            console.log(post);
            const navigationExtras: NavigationExtras = {
              queryParams: { item: JSON.stringify(post) }
            };
            this.navController.navigateForward(['/single-page'], navigationExtras);
          }
        });
      }
    });
  }

  openSingleCategory(item) {
    const navigationExtras: NavigationExtras = {
      queryParams: { item: JSON.stringify(item) }
    };
    if (item.id === -1) {
      this.navController.navigateForward(['/tabs/home']);
    } else {
      this.navController.navigateForward(['/tabs/page-category-news'], navigationExtras);
    }
  }

  getCategories() {
    this.categoryService.getCategories(1).subscribe((data: Array<any>) => {
      if (!data) {
        return;
      }
      this.categories = data.filter(item => {
        if (item.count === 0) {
          return false;
        }
        if (!ConfigData.enableExcludeFromMenu) {
          return true;
        }
        return ConfigData.excludeFromMenu[item.id];
      });
      this.categories.unshift({ id: -1, name: 'الرئيسية', orderIndex: 0 });

      const storeItems = [];

      this.categories.forEach(element => {
        element.orderIndex = ConfigData.orderedMenu[element.id] ? ConfigData.orderedMenu[element.id] : 0;
        storeItems.push(element);
      });
      this.categories.sort((a, b) => {
        return a.orderIndex - b.orderIndex;
      });
      console.log(this.categories);
      this.storage.set('category', JSON.stringify(storeItems));
    });
  }

  openPage(page) {
    this.navController.navigateForward(['/tabs/' + page], {});
  }


  async onPushReceived(payload: OSNotificationPayload) {
    const alert = await this.alertCtrl.create({
      header: 'إشعار',
      subHeader: payload.title,
      message: payload.body,
      buttons: ['موافق']
    });

    await alert.present();
  }

  async onPushOpened(payload: OSNotificationPayload) {
    const alert = await this.alertCtrl.create({
      header: 'إشعار',
      subHeader: payload.title,
      message: payload.body,
      buttons: ['موافق']
    });

    await alert.present();
  }
}
