import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateWorkoutPageRoutingModule } from './create-workout-routing.module';
import { CreateWorkoutPage } from './create-workout.page';


@NgModule({
  declarations: [
    CreateWorkoutPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateWorkoutPageRoutingModule,
    ReactiveFormsModule
  ],
})


export class CreateWorkoutPageModule {}
