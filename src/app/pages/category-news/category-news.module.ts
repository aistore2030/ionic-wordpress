import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../components/shared.module';
import { CategoryNewsPage } from './category-news';
import { MomentPipeModule } from 'src/app/common/moment.pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    MomentPipeModule,
    RouterModule.forChild([
      {
        path: '',
        component: CategoryNewsPage
      }
    ])
  ],
  declarations: [CategoryNewsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CategoryNewsPageModule { }
