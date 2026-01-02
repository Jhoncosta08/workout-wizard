import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserWorkoutPageRoutingModule } from './user-workout-routing.module';
import { UserWorkoutPage } from './user-workout.page';
import {UserAddWorkoutPageModule} from '../user-add-workout/user-add-workout.module';
import {PageSpinnerModule} from '../../../components/page-spinner/page-spinner.module';


@NgModule({
  declarations: [
    UserWorkoutPage
  ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UserWorkoutPageRoutingModule,
        UserAddWorkoutPageModule,
        PageSpinnerModule,
        NgOptimizedImage
    ],
})


export class UserWorkoutPageModule {}
