import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PhysicalAssessmentPageRoutingModule } from './physical-assessment-routing.module';
import { PhysicalAssessmentPage } from './physical-assessment.page';
import {AnthropometryFormComponent} from './physical-form/anthropometry-form/anthropometry-form.component';
import {BodyCompositionFormComponent} from './physical-form/body-composition-form/body-composition-form.component';
import {GeneralInfoFormComponent} from './physical-form/general-info-form/general-info-form.component';
import {MedicalHistoryFormComponent} from './physical-form/medical-history-form/medical-history-form.component';

@NgModule({
  declarations: [
    PhysicalAssessmentPage,
    AnthropometryFormComponent,
    BodyCompositionFormComponent,
    GeneralInfoFormComponent,
    MedicalHistoryFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PhysicalAssessmentPageRoutingModule,
    ReactiveFormsModule
  ],
})
export class PhysicalAssessmentPageModule {}
