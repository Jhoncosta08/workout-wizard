import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhysicalAssessmentListPage } from './physical-assessment-list.page';

const routes: Routes = [
  {
    path: '',
    component: PhysicalAssessmentListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysicalAssessmentListPageRoutingModule {}
