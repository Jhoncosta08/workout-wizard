import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhysicalAssessmentPage } from './physical-assessment.page';


const routes: Routes = [
  {
    path: '',
    component: PhysicalAssessmentPage,
  },
  {
    path: 'physical-assessment-list',
    loadChildren: () => import('./physical-assessment-list/physical-assessment-list.module').then( m => m.PhysicalAssessmentListPageModule)
  },
  {
    path: 'physical-assessment-detail',
    loadChildren: () => import('./physical-assessment-detail/physical-assessment-detail.module').then( m => m.PhysicalAssessmentDetailPageModule)
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class PhysicalAssessmentPageRoutingModule {}
