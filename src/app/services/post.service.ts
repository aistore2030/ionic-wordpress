import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from './service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService extends Service {

  constructor(public http: HttpClient) {
    super(http, 'posts');
  }

  getPostListWithFilter(categoryId, page= null) {
    return new Observable(observer => {
      const categories = JSON.parse(localStorage.getItem('category'));
      const posts = [];
      const query = categoryId ? `categories=${categoryId}` : null;
      const itemListRequest = page ? this.getItemList(query, null, null, page, 10) : this.getItemList(query);
      itemListRequest.subscribe((data: Array<any>) => {
        data.forEach(element => {
          posts.push({
            'category': categories[element.categories[0]] ? categories[element.categories[0]].name : '',
            'categoryId': element.categories[0],
            'title': element.title.rendered,
            'time': element.date,
            'image': '',
            'id': element.id,
            'link': element.link,
            'content': element.content.rendered,
            'mediaId': element.featured_media
          });
        });
        observer.next(posts);
        observer.complete();
      }, err => {
        observer.next(posts);
        observer.complete();
      }, () => {
        observer.next(posts);
        observer.complete();
      });
    });
  }
}
