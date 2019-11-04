import { OneSignalConfig } from './../services/one.signal.service';
import { Component } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ConfigData } from '../services/config';
import { BookmarkService } from '../services/bookmark.service';
import { Platform } from 'ionic-angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [];
  headerMenuItem = {};

  rootPage: any = 'HomePage';
  pages: Array<{title: string, component: any, icon: string, url: string}>;
  isPushNotificationEnabled = true;

  constructor(
    private oneSignal: OneSignal,
    private navController: NavController,
    private bookmark: BookmarkService,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    ) {
    this.initializeApp();

    // Change Color StatusBar
    this.statusBar.backgroundColorByName('white');
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'الرئيسيه', component: 'HomePage', icon: 'book', url: 'home' },
      { title: 'ألأقسام', component: 'CategoryPage', icon: 'list-box', url: 'category' },
      { title: 'المفضله', component: 'BookmarkPage', icon: 'bookmark', url: 'bookmark' },
      { title: 'معلومات عنا', component: 'AboutPage', icon: 'ios-flag', url: 'about' },
      { title: 'الأعدادات', component: 'settings', icon: 'settings', url: 'settings' },
    ];
  }

  initializeApp() {
    localStorage.setItem('', 'true');
    const self = this;
    this.platform.ready().then(() => {

      // Uncommnets this code fore prodaction

      // this.bookmark
      // .readFromFile()
      // .then(data => {
      //   if (window['cache']) {
      //     window['cache'].clear(() => {
      //       console.log('success')
      //       self.resetData(data)
      //     }, () => {
      //       console.log('err')
      //       self.resetData(data)
      //     });
      //     window['cache'].cleartemp();
      //   } else {
      //     self.defaultLoad();
      //   }
      // });
      self.defaultLoad();
    });
  }

  resetData(data) {
    const settingsObject = JSON.parse(data);
    if (settingsObject.isLightColorSelected) {
      localStorage.setItem('isLightColorSelected', settingsObject.isLightColorSelected + '');
    } else {
      localStorage.setItem('isLightColorSelected', 'true');
    }
    if (settingsObject.isPushNotificationEnabled) {
      localStorage.setItem('isPushNotificationEnabled', settingsObject.isPushNotificationEnabled + '');
    } else {
      localStorage.setItem('isPushNotificationEnabled', 'true');
    }
    if (settingsObject.isRTLEnabled) {
      localStorage.setItem('isRTLEnabled', settingsObject.isRTLEnabled + '');
    } else {
      localStorage.setItem('isRTLEnabled', 'true');
    }

    localStorage.setItem('bookmark', settingsObject.bookmark + '');
    this.defaultLoad();
  }


  defaultLoad() {

      document.getElementsByTagName('ion-menu')[0].setAttribute('side', 'end');
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');

    if (!localStorage.getItem('isLightColorSelected')) {
      localStorage.setItem('isLightColorSelected', 'true');
    } else {
      const isLightColorSelected = localStorage.getItem('isLightColorSelected') === 'true';
      const theme = isLightColorSelected ? 'colorLight' : 'colorDark';
      document.getElementsByTagName('body')[0].setAttribute('class', theme);
    }


    this.statusBar.styleDefault();
    this.splashScreen.hide();


    if (ConfigData.oneSignal && ConfigData.oneSignal.appID && ConfigData.oneSignal.googleProjectId) {
        this.oneSignal.startInit(ConfigData.oneSignal.appID, ConfigData.oneSignal.googleProjectId);
        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
        this.oneSignal.endInit();
    }
    let pushNotificationEnabledStorageValue = localStorage.getItem('isPushNotificationEnabled');
    if (!pushNotificationEnabledStorageValue) {
        localStorage.setItem('isPushNotificationEnabled', 'true');
        pushNotificationEnabledStorageValue = 'true';
    }
    this.oneSignal.setSubscription(this.isPushNotificationEnabled);
  }

  openPage(page) {
    this.navController.navigateForward([page.url], {});
  }
}
