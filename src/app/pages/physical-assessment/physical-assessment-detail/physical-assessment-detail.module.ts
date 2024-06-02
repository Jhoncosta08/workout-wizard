import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PhysicalAssessmentDetailPageRoutingModule } from './physical-assessment-detail-routing.module';
import { PhysicalAssessmentDetailPage } from './physical-assessment-detail.page';
import {AnthropometryInfoComponent} from './anthropometry-info/anthropometry-info.component';
import {BodyInfoComponent} from './body-info/body-info.component';
import {GeneralInfoComponent} from './general-info/general-info.component';
import {MedicalInfoComponent} from './medical-info/medical-info.component';


@NgModule({
  declarations: [
    PhysicalAssessmentDetailPage,
    AnthropometryInfoComponent,
    BodyInfoComponent,
    GeneralInfoComponent,
    MedicalInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhysicalAssessmentDetailPageRoutingModule
  ],
})


export class PhysicalAssessmentDetailPageModule {}
