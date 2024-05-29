import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAddWorkoutPage } from './user-add-workout.page';


const routes: Routes = [
  {
    path: '',
    component: UserAddWorkoutPage
  },
  {
    path: ':workoutId/:id',
    component: UserAddWorkoutPage
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class UserAddWorkoutPageRoutingModule {}
