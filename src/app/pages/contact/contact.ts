import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { CommentService } from '../../services/comment.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  styleUrls: ['contact.scss'],
  providers: [CommentService]
})
export class ContactPage {
  postId: number;
  authorName = '';
  authorEmail = '';
  comment = '';

  isAuthorValid: Boolean = true;
  isEmailValid: Boolean = true;
  isCommentValid: Boolean = true;

  // tslint:disable-next-line: max-line-length
  regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(
    public navCtrl: NavController,
    private route: ActivatedRoute,
    private commentService: CommentService
  ) {
    const self = this;
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

  isDataValid(): Boolean {
    if (this.authorName.trim().length <= 1) {
      this.isAuthorValid = false;
    }

    // this.isEmailValid = this.regex.test(this.authorEmail);

    if (this.comment.trim().length <= 2) {
      this.isCommentValid = false;
    }
    return this.isAuthorValid && this.isCommentValid;
  }

  addComment(event) {

    const payload = {
      'personalizations': [
        {
          'to': [
            {
              'email': 'honeyize14@hotmail.com'
            }
          ],
          'subject': 'رسالة من ' + this.authorName
        }
      ],
      'from': {
        'email': 'admin@example.com'
      },
      'content': [
        {
          'type': 'text/plain',
          'value': this.comment
        }
      ]
    };
    const myHeaders = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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',
    });
    const data = new FormData();
    data.append('json', JSON.stringify(payload));
    if (this.isDataValid()) {
      fetch('https://api.sendgrid.com/v3/mail/send',
        {
          method: 'POST',
          headers: myHeaders,
          body: data
        })
        .then(function (res) { return res.json(); })
        .then(function (data) { console.log(JSON.stringify(data)); });
    }
  }
}
