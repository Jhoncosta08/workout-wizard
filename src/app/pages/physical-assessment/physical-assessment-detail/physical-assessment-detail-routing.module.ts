import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhysicalAssessmentDetailPage } from './physical-assessment-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PhysicalAssessmentDetailPage
  },
  {
    path: ':id',
    component: PhysicalAssessmentDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysicalAssessmentDetailPageRoutingModule {}
