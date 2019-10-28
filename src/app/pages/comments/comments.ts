import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommentService } from '../../services/comment.service';
import { NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
  styleUrls: ['comments.scss'],
  providers: [CommentService]
})
export class CommentsPage {
  comments:Array<any>;
  post:any;
  commentPageLoaded = 1;
    
  constructor(public navCtrl: NavController,
    private route: ActivatedRoute,
    private commentService:CommentService) {
      let self = this;
      this.route.queryParams.subscribe(params => {
        self.post = JSON.parse(params['item']);
        self.onCompleteEvent(this.post.comments);
        self.doRefresh(null);
      });
  }

  openComment(event) {
    if(event) {
      event.stopPropagation();
    }
    const navigationExtras: NavigationExtras = {
      queryParams: { postId: this.post.id }
    };
    this.navCtrl.navigateForward(['/form-page'], navigationExtras);
  }

  onCompleteEvent(comments:Array<any>) {
    this.comments = comments ? comments: [];
    this.comments.forEach(element => element.avatar = element.author_avatar_urls['96']);
  }

  doRefresh(event) {
    this.commentService
        .getAllCommentsForPostById(this.post.id, this.commentPageLoaded++)
        .subscribe((comments:Array<any>) => {
          this.onCompleteEvent(comments);
          if (event) {
            event.target.complete();
          }
        }, err=> {
          if (event) {
            event.target.complete();
          }
        }, () => {
          if (event) {
            event.target.complete();
          }
        });
  }

  doInfinite(event) {
    this.doRefresh(event);
  }
}
