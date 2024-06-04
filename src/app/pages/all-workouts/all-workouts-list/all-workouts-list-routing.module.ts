import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllWorkoutsListPage } from './all-workouts-list.page';

const routes: Routes = [
  {
    path: ':id',
    component: AllWorkoutsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllWorkoutsListPageRoutingModule {}
