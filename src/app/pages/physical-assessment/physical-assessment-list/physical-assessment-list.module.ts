import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhysicalAssessmentListPageRoutingModule } from './physical-assessment-list-routing.module';

import { PhysicalAssessmentListPage } from './physical-assessment-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhysicalAssessmentListPageRoutingModule
  ],
  declarations: [PhysicalAssessmentListPage]
})
export class PhysicalAssessmentListPageModule {}
