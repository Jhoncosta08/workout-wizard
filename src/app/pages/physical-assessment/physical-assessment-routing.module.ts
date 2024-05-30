import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhysicalAssessmentPage } from './physical-assessment.page';

const routes: Routes = [
  {
    path: '',
    component: PhysicalAssessmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysicalAssessmentPageRoutingModule {}
