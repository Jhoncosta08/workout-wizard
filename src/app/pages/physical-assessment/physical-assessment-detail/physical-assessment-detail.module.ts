import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhysicalAssessmentDetailPageRoutingModule } from './physical-assessment-detail-routing.module';

import { PhysicalAssessmentDetailPage } from './physical-assessment-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhysicalAssessmentDetailPageRoutingModule
  ],
  declarations: [PhysicalAssessmentDetailPage]
})
export class PhysicalAssessmentDetailPageModule {}
