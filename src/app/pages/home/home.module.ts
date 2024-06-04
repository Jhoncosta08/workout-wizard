import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import {ExerciseImgPipe} from '../../pipes/exercise-img.pipe';
import {PageSpinnerModule} from '../../components/page-spinner/page-spinner.module';


@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ExerciseImgPipe,
    PageSpinnerModule
  ],
})


export class HomePageModule {}
