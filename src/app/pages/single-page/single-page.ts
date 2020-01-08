import { Component, NgZone, ViewChild } from '@angular/core';
import { NavController, IonContent } from '@ionic/angular';
import { CommentService } from '../../services/comment.service';
import { DomSanitizer } from '@angular/platform-browser';
import { BookmarkService } from '../../services/bookmark.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { ConfigData } from 'src/app/services/config';
import { AdMobFreeInterstitial } from '@ionic-native/admob-free/ngx';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'single-page',
  templateUrl: 'single-page.html',
  styleUrls: ['single-page.scss'],
  providers: [CommentService, BookmarkService, AdMobFreeInterstitial, PhotoViewer]
})
export class SinglePage {
  active: boolean;
  numberOfComment: Number = 0;
  post: any;
  htmlContent: any;
  htmlTitle: any;
  fontSize = 15;
  @ViewChild(IonContent) content: IonContent;

  constructor(public navCtrl: NavController,
    private _ngZone: NgZone,
    private route: ActivatedRoute,
    private adMobFreeInterstitial: AdMobFreeInterstitial,
    private domSanitizer: DomSanitizer,
    private commentService: CommentService,
    private socialSharing: SocialSharing,
    private bookmarkService: BookmarkService,
    private photoViewer: PhotoViewer,
    private storage: Storage) {
    const self = this;
    this.route.queryParams.subscribe(params => {
      self.post = JSON.parse(params['item']);
      if (self.post && self.post.content) {
        self.htmlContent = self.domSanitizer.bypassSecurityTrustHtml(self.post.content);
      }

      if (this.post && this.post.title) {
        self.htmlTitle = this.domSanitizer.bypassSecurityTrustHtml(this.post.title);
      }

      self.commentService
        .getAllCommentsForPostById(self.post.id, 1)
        .subscribe((comments: Array<any>) => {
          self.numberOfComment = comments.length;
          self.post.comments = comments;
        });
    });
    this.incrementPostCounter();
    // this.showAdsAfterXPosts();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
  }

  larger() {
    if (this.fontSize < 20) {
      this.fontSize += 1;
    }
  }

  smaller() {
    if (this.fontSize > 14) {
      this.fontSize -= 1;
    }
  }

  open(link) {
    this.photoViewer.show(link, 'Optional Title');
  }

  incrementPostCounter() {
    let counter = 0;
    this.storage.get('post-counter').then(t => {
      if (t) {
        // tslint:disable-next-line:radix
        counter = parseInt(t);
        counter++;
        this.storage.set('post-counter', counter + '');
      }
    });
  }

  showAdsAfterXPosts() {
    this.storage.get('post-counter').then(t => {
      let counter = 0;
      if (t) {
        // tslint:disable-next-line:radix
        counter = parseInt(t);
      }
      if (ConfigData.interstitialAds.showAdsAfterXPosts <= counter) {
        this.showInterstitialAds();
        this.storage.set('post-counter', '0');
      }
    });

  }

  showInterstitialAds() {
    if (!ConfigData.interstitialAds.enable) {
      return;
    }
    this.adMobFreeInterstitial.config(ConfigData.interstitialAds.config);
    this.adMobFreeInterstitial.prepare();
  }

  openComment(item, event) {
    if (event) {
      event.stopPropagation();
    }
    const navigationExtras: NavigationExtras = {
      queryParams: { postId: JSON.stringify(this.post.id) }
    };
    this.navCtrl.navigateForward(['/form-page'], navigationExtras);
  }

  openCommentList(item, e) {
    if (e) {
      e.stopPropagation();
    }
    const navigationExtras: NavigationExtras = {
      queryParams: { item: JSON.stringify(item) }
    };
    this.navCtrl.navigateForward(['/comment-page'], navigationExtras);
  }

  isClassActive() {
    return this.active;
  }

  setClassActive(newValue) {
    if (this.active !== newValue) {
      this._ngZone.run(() => {
        this.active = newValue;
      });
    }
  }

  share = (item, e) => {
    console.log(item.title.replace('&#8220;', '"').replace('&#8220;', '"'));
    this.socialSharing.share(item.title.replace('&#8220;', '"').replace('&#8220;', '"'), '', '', decodeURI(item.link))
      .then(() => {

      }).catch(() => {
      });
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

  onItemClick(item) {
    this.content.scrollToTop(200);
  }

  ionViewDidLeave() {
    Array
      .prototype.slice
      .call(document.getElementsByTagName('video'))
      .forEach(video => video.pause());
  }

  ionViewDidEnter() {
    const self = this;
    const imgs = document.getElementsByTagName('single-page')[0].getElementsByTagName('img');
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].addEventListener('click', () => {
        const large = imgs[i].src.split('?')[0];
        self.photoViewer.show(large, '');
      });
    }
  }


  subscribeToIonScroll() { }
}
