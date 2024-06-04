import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PhysicalAssessmentListPageRoutingModule } from './physical-assessment-list-routing.module';

import { PhysicalAssessmentListPage } from './physical-assessment-list.page';
import {PageSpinnerModule} from '../../../components/page-spinner/page-spinner.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PhysicalAssessmentListPageRoutingModule,
        PageSpinnerModule
    ],
  declarations: [PhysicalAssessmentListPage]
})
export class PhysicalAssessmentListPageModule {}
