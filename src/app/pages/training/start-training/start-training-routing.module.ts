import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartTrainingPage } from './start-training.page';

const routes: Routes = [
  {
    path: ':id',
    component: StartTrainingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartTrainingPageRoutingModule {}
