import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';

@Injectable({ providedIn: 'root' })
export class BookmarkService {
  constructor(private file: File,
    private storage: Storage) { }

  save(post) {
    if (!post) {
      return;
    }
    if (!post.id) {
      return;
    }

    this.getAllBookmark().then(t => {
      const bookmarkList = t;
      if (bookmarkList[post.id]) {
        return;
      } else {
        bookmarkList[post.id] = post;
        this.storage.set('bookmark', JSON.stringify(bookmarkList));
      }
    });
  }

  clearAll() {
    this.storage.remove('bookmark');
  }

  delete(post) {
    if (!post) {
      return;
    }
    if (!post.id) {
      return;
    }
    this.getAllBookmark().then(t => {
      const bookmarkList = t;
      if (bookmarkList[post.id]) {
        delete bookmarkList[post.id];
        this.storage.set('bookmark', JSON.stringify(bookmarkList));
      }
    });

  }

  async getAllBookmark() {
    const t = await this.storage.get('bookmark');
    const bookmarkListString = t;
    if (!bookmarkListString) {
      return {};
    } else {
      return JSON.parse(bookmarkListString);
    }

  }

  getSettingsObject() {
    // const result = {
    //   bookmark: this.storage.getItem('bookmark'),
    //   isPushNotificationEnabled: this.storage.getItem(
    //     'isPushNotificationEnabled'
    //   ),
    //   isLightColorSelected: this.storage.getItem('isLightColorSelected')
    // };
    // return JSON.stringify(result);
    return '{}';
  }

  writeToFile() {
    console.log('writeToFile');
    this.file.writeFile(
      this.file.applicationDirectory,
      'settings.json',
      this.getSettingsObject(),
      { replace: true }
    );
  }

  readFromFile() {
    console.log('readFile');
    return this.file.readAsText(
      this.file.applicationDirectory,
      'settings.json'
    );
  }
}
