import { Component, Input, EventEmitter, Output } from '@angular/core';
import { PostService } from '../../services/post.service';
import { MediaService } from '../../services/media.service';
import { BookmarkService } from '../../services/bookmark.service';

@Component({
  selector: 'news-list',
  templateUrl: 'news-list.html',
  styleUrls: ['news-list.scss'],
  providers: [PostService, MediaService, BookmarkService]
})
export class NewsListPage {
  @Input('categoryId') categoryId: any;
  @Input('title') title: any;
  @Input('postId') postId: any;
  @Output() onItemClick = new EventEmitter();
  
  posts: any = [];
  events: any = {};
  bookmarks:any = {};
  postPageLoaded = 1;

  constructor(
    private postService: PostService,
    private mediaService: MediaService,
    private bookmarkService: BookmarkService) {
      this.bookmarks = this.bookmarkService.getAllBookmark();
    }

  ngOnChanges() {
    this.loadData(this.categoryId, null);
  }

  doInfinite(event) {
    this.loadData(this.categoryId, event);
  }

  itemClick(item) {
    this.onItemClick.emit(item);
  }

  loadData(categoryId, event) {
    this.postService.getPostListWithFilter(categoryId, this.postPageLoaded++).subscribe((data: Array<any>) => {
      console.log("postService");
      let newData = this.postId ? data.filter(it => it.id != this.postId) : data
      this.posts = this.posts.concat(newData);

      if (event) {
        console.log("event");
        event.target.complete();
      }

      newData.forEach(element => {
        element.bookmark = this.bookmarks[element.id] ? true : false
        if (element.mediaId) {
          this.mediaService.getItemById(element.mediaId).subscribe(media => {
            this.posts.forEach(element => {
              if (media['id'] === element['mediaId']) {
                element.image = media['source_url'];
              }
            });
          })
        }
      });
    },
    err =>{
      console.log("err");
      if (event) {
        event.target.complete();
      }
    }, ()=>{
      console.log("done");
      if (event) {
        event.target.complete();
      }
    }
  )

  }

}
