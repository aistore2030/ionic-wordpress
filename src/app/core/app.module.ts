import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { OneSignal } from '@ionic-native/onesignal/ngx';
import { File } from '@ionic-native/file/ngx';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { IonicStorageModule } from '@ionic/storage';

// import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
// import { TranslateHttpLoader} from '@ngx-translate/http-loader';

// export function HttpLoaderFactory(http: Http) {
//   return new TranslateHttpLoader(http, './assets/i18n/', '.json');
//   }

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, HttpModule, HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule,
    // TranslateModule.forRoot({
    //   loader: {
    //        provide: TranslateLoader,
    //        useFactory: HttpLoaderFactory,
    //        deps: [HttpClient]
    //      }
    //   })
  ],
  providers: [
    StatusBar, SplashScreen, OneSignal, File, SocialSharing,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class AppModule { }

