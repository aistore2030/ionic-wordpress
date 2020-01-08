import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Service } from './service';
import { LoadingService } from './loading';
import { Storage } from '@ionic/storage';

@Injectable({ providedIn: 'root' })
export class PostService extends Service {

  constructor(public http: HttpClient, public loader: LoadingService, private storage: Storage) {
    super(http, 'posts', loader);
  }

  async getPostListWithFilter(categoryId, page = null, perPage = null) {
    const t = await this.storage.get('category');
    const categories = JSON.parse(t);
    const posts = [];
    const query = categoryId ? `categories=${categoryId}` : null;
    const itemListRequest = page ? this.getItemList(query, null, null, page, perPage) : this.getItemList(query);
    return itemListRequest.map(response => {
      const temp: any = response;
      temp.forEach(t_1 => {
        const catId = categoryId ? categoryId : t_1.categories && t_1.categories.length
          ? t_1.categories[0] : t_1.categories[1];
        const cat = categoryId ? categories.find(c => c.id === categoryId) : t_1.categories && t_1.categories.length
          ? categories.find(c => c.id === t_1.categories[0] || c.id === t_1.categories[1]) : null;
        posts.push({
          'category': cat ? cat.name : '',
          'categoryId': catId,
          'title': t_1.title.rendered,
          'time': t_1.date,
          'image': '',
          'id': t_1.id,
          'link': t_1.link,
          'content': t_1.content.rendered,
          'mediaId': t_1.featured_media
        });
      });
      return posts;
    });
  }
}
