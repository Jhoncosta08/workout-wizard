import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserAddWorkoutPageRoutingModule } from './user-add-workout-routing.module';
import { UserAddWorkoutPage } from './user-add-workout.page';
import {AllWorkoutsComponent} from '../../../components/all-workouts/all-workouts.component';
import {ExerciseListComponent} from '../../../components/exercise-list/exercise-list.component';
import {ExerciseImgPipe} from '../../../pipes/exercise-img.pipe';


@NgModule({
  declarations: [
    UserAddWorkoutPage,
    AllWorkoutsComponent,
    ExerciseListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserAddWorkoutPageRoutingModule,
    ExerciseImgPipe
  ]
})


export class UserAddWorkoutPageModule {}
