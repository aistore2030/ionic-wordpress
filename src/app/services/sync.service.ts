import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { CategoryService } from './categoty.service';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';

@Injectable({ providedIn: 'root' })
export class SyncService {
  constructor(private userService: UserService, private categoryService: CategoryService, private storage: Storage) { }

  sync() {
    return new Observable(observer => {
      this.userService.getItemList().subscribe((items: Array<any>) => {
        if (!items) {
          return;
        }
        const storeItem = {};
        items.forEach(element => {
          storeItem[element.id] = element;
        });
        this.storage.set('users', JSON.stringify(storeItem));
      });

      this.categoryService.getCategories(1).subscribe((items: Array<any>) => {
        const storeItem = {};
        if (!items) {
          return;
        }
        items.forEach(element => {
          storeItem[element.id] = element;
        });
        this.storage.set('category', JSON.stringify(storeItem));
        observer.next(storeItem);
        observer.complete();
      });
    });
  }
}
