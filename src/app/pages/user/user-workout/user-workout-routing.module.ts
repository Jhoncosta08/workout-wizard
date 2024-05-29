import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserWorkoutPage } from './user-workout.page';

const routes: Routes = [
  {
    path: '',
    component: UserWorkoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserWorkoutPageRoutingModule {}
