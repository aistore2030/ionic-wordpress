import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from './service';
import { LoadingService } from './loading';

@Injectable({ providedIn: 'root' })
export class CommentService extends Service {
    constructor(public http: HttpClient, public loader: LoadingService) {
        super(http, 'comments', loader);
    }
    getAllCommentsForPostById(postId, page) {
        return this.getItemList(`post=${postId}`, null, null, page, 10);
    }

    addComment(postId, content, author, email, url = '') {
        const body = {};

        if (postId) {
            body['post'] = postId;
        }
        if (content) {
            body['content'] = content;
        }
        if (author) {
            body['author_name'] = author;
        }
        if (email) {
            body['author_email'] = email;
        }
        if (url) {
            body['author_url'] = url;
        }

        return this.http.post(`${this.getRootUrl()}`, body);
    }
}
