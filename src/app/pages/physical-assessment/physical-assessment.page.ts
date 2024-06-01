import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PhysicalInterface} from '../../interfaces/physical.interface';


@Component({
  selector: 'app-physical-assessment',
  templateUrl: './physical-assessment.page.html',
  styleUrls: ['./physical-assessment.page.scss'],
})
export class PhysicalAssessmentPage {
  physicalAssessmentForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.physicalAssessmentForm = this.fb.group({});
  }


  onSavePhysycalForm(): void {
    if (this.physicalAssessmentForm.valid) {
      const formData: PhysicalInterface = this.physicalAssessmentForm.value;
      console.log(formData);
    } else {
      console.log("Formulário inválido. Por favor, preencha todos os campos corretamente.");
    }
  }

}
