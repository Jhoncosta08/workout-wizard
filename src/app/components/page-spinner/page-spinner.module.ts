import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageSpinnerComponent} from './page-spinner.component';
import {IonicModule} from '@ionic/angular';



@NgModule({
  declarations: [
    PageSpinnerComponent
  ],
  exports: [
    PageSpinnerComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class PageSpinnerModule { }
