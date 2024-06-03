import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateWorkoutPageRoutingModule } from './create-workout-routing.module';
import { CreateWorkoutPage } from './create-workout.page';
import {UserAddWorkoutPageModule} from '../../user/user-add-workout/user-add-workout.module';
import {ExerciseImgPipe} from '../../../pipes/exercise-img.pipe';


@NgModule({
  declarations: [
    CreateWorkoutPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateWorkoutPageRoutingModule,
    ReactiveFormsModule,
    UserAddWorkoutPageModule,
    ExerciseImgPipe,
  ],
})


export class CreateWorkoutPageModule {}
