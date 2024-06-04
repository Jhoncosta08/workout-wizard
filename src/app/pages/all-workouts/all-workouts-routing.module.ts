import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllWorkoutsPage } from './all-workouts.page';

const routes: Routes = [
  {
    path: '',
    component: AllWorkoutsPage
  },
  {
    path: 'all-workouts-list',
    loadChildren: () => import('./all-workouts-list/all-workouts-list.module').then( m => m.AllWorkoutsListPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllWorkoutsPageRoutingModule {}
