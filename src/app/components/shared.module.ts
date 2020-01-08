import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NewsItemPage } from './news-item/news-item';
import { NewsItemHomePage } from './news-item-home/news-item-home';
import { NewsListPage } from './news-list/news-list';
import { MomentPipeModule } from '../common/moment.pipe.module';
import { SortPipeModule } from '../common/sort.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MomentPipeModule,
    SortPipeModule
  ],
  declarations: [
    NewsItemPage, NewsItemHomePage, NewsListPage
  ],
  exports: [
    NewsItemPage, NewsItemHomePage, NewsListPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
