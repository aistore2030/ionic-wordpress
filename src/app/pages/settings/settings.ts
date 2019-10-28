import { OneSignalConfig } from './../../services/one.signal.service';
import { Component } from '@angular/core';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { File } from '@ionic-native/file/ngx';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'settings',
  templateUrl: 'settings.html',
  styleUrls: ['settings.scss']
})
export class SettingsPage {

  themes = {
    autumn: {
      primary: "#ffffff",
      secondary: "#fafafa",
      danger: "#f53d3d",
      light: "#1b1e28",
      sliderColor: "#fff",
      colorIcon: "#CCCBDA",
      colorIconText: "#7F7E96",
      category: "#fff",
      listBackgroundColor: "#ffffff",
      backgroundColor: "#fafafa",
      toobarBackground: "#ffffff",
      toobarButton: "#AAB2B7",
      toobarText: "#FFFFFF"
    },
    night: {
       primary: "#282C39",
       secondary: "#1b1e28",
       danger: "#f53d3d",
       sliderColor: "#ffffff",
       light: "#ffffff",
       colorIcon: "#7F7E96",
       colorIconText: "#7F7E96",
       category: "#ffffff",
       listBackgroundColor: "#1B1E28",
       backgroundColor: "#282C39",
       toobarBackground: "#1B1E28",
       toobarButton: "#D8D8D8",
       toobarText: "#FFFFFF",
    }
  };

  searchTerm: string;
  filteredNews: any = [];

  isShowSearchBar = false;

  isLightColorSelected:Boolean = true;
  isPushNotificationEnabled:boolean = false;
  isRTLEnabled:Boolean = true;

  constructor(private oneSignal: OneSignal, private file:File, private theme: ThemeService) {
    this.isPushNotificationEnabled = localStorage.getItem('isPushNotificationEnabled') == "true";
    this.isLightColorSelected = localStorage.getItem('isLightColorSelected') == "true";
    this.isRTLEnabled = localStorage.getItem('isRTLEnabled') == "true";
  }

  changeTheme(name) {
    this.theme.setTheme(this.themes[name]);
  }

  ionChangeSelectedTheme(e){
    localStorage.setItem('isLightColorSelected', this.isLightColorSelected + "");
    this.writeToFile();
    let theme = this.isLightColorSelected ? "colorLight" : "colorDark";
    document.getElementsByTagName("body")[0].setAttribute("class", theme);
  }

  //Enable/Disable push notification OneSignal
  ionChange(e){
    this.oneSignal.setSubscription(this.isPushNotificationEnabled);
    localStorage.setItem('isPushNotificationEnabled', "" + this.isPushNotificationEnabled);
    this.writeToFile();
    if(this.isPushNotificationEnabled) {
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    } else {
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);
    }
    this.oneSignal.endInit();
  }

  ionChangeRTL(e){
      localStorage.setItem('isRTLEnabled', "" + this.isRTLEnabled)
      document.getElementsByTagName('ion-menu')[0]
              .setAttribute('side', this.isRTLEnabled  ? 'end': 'start');
      document.getElementsByTagName('html')[0]
              .setAttribute('dir', this.isRTLEnabled  ? 'rtl': 'ltr');
              console.log("Here", this.isRTLEnabled)
              console.log("Here", localStorage.setItem('isRTLEnabled', "" + this.isRTLEnabled))
  }

  getSettingsObject() {
    let result = {
        'bookmark': localStorage.getItem('bookmark'),
        'isPushNotificationEnabled': localStorage.getItem('isPushNotificationEnabled'),
        'isLightColorSelected': localStorage.getItem('isLightColorSelected'),
        'isRTLEnabled': localStorage.getItem('isRTLEnabled'),
    };
    return JSON.stringify(result);
  }

  writeToFile() {
    this.file.writeFile(this.file.externalRootDirectory, 'settings.json', this.getSettingsObject(), {replace: true});
  }

  readFromFile() {
      return this.file.readAsText(this.file.externalRootDirectory, 'settings.json');
  }
  onClickSearch() { 
    this.isShowSearchBar = !this.isShowSearchBar;
  }
}
