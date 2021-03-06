import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../components/shared.module';
import { SinglePage } from './single-page';
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
        component: SinglePage
      }
    ])
  ],
  declarations: [SinglePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SinglePageModule { }
