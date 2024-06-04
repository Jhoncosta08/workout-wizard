import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AllWorkoutsPageRoutingModule } from './all-workouts-routing.module';
import { AllWorkoutsPage } from './all-workouts.page';
import {ExerciseImgPipe} from '../../pipes/exercise-img.pipe';
import {PageSpinnerModule} from '../../components/page-spinner/page-spinner.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllWorkoutsPageRoutingModule,
    ExerciseImgPipe,
    PageSpinnerModule
  ],
  declarations: [AllWorkoutsPage]
})


export class AllWorkoutsPageModule {}
