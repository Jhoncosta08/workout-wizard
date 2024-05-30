import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserWorkoutPageRoutingModule } from './user-workout-routing.module';
import { UserWorkoutPage } from './user-workout.page';
import {UserAddWorkoutPageModule} from '../user-add-workout/user-add-workout.module';


@NgModule({
  declarations: [
    UserWorkoutPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserWorkoutPageRoutingModule,
    UserAddWorkoutPageModule
  ],
})


export class UserWorkoutPageModule {}
