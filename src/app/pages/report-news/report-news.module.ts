import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../components/shared.module';
import { MomentPipeModule } from 'src/app/common/moment.pipe.module';
import { ReportNewsPage } from './report-news';

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
        component: ReportNewsPage
      }
    ])
  ],
  declarations: [ReportNewsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReportNewsPageModule { }
