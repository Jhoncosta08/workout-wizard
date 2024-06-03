import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectTrainingPage } from './select-training.page';

const routes: Routes = [
  {
    path: '',
    component: SelectTrainingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectTrainingPageRoutingModule {}
