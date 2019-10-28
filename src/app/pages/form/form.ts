import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommentService } from '../../services/comment.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
  styleUrls: ['form.scss'],
  providers: [CommentService]
})
export class FormPage {
  postId: number;
  authorName: string = "";
  authorEmail: string = "";
  comment: string = "";

  isAuthorValid:Boolean = true;
  isEmailValid:Boolean = true;
  isCommentValid:Boolean = true;

  regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(public navCtrl: NavController,
    private route: ActivatedRoute,
    private commentService: CommentService) {
      let self = this;
      this.route.queryParams.subscribe(params => {
          self.postId = params['postId'];
          if (!this.postId) {
            self.navCtrl.pop();
          }
      });
  }

  resetError() {
    this.isAuthorValid = true;
    this.isEmailValid = true;
    this.isCommentValid = true;
  }

  isDataValid():Boolean {
    if (this.authorName.trim().length <= 1) {
      this.isAuthorValid = false
    }

    this.isEmailValid = this.regex.test(this.authorEmail);

    if (this.comment.trim().length <= 2) {
      this.isCommentValid = false
    }
    return this.isAuthorValid && this.isEmailValid && this.isCommentValid
  }

  addComment() {
    this.resetError()
    if (this.isDataValid()) {
      this.commentService
      .addComment(this.postId, this.comment, this.authorName, this.authorEmail)
      .subscribe(item => {
        this.navCtrl.pop();
      })
    }
  }
}
