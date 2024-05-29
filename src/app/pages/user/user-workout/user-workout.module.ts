import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserWorkoutPageRoutingModule } from './user-workout-routing.module';

import { UserWorkoutPage } from './user-workout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserWorkoutPageRoutingModule
  ],
  declarations: [UserWorkoutPage]
})
export class UserWorkoutPageModule {}
