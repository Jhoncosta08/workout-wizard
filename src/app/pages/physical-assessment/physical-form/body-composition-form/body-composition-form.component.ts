import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-body-composition-form',
  templateUrl: './body-composition-form.component.html',
  styleUrls: ['./body-composition-form.component.scss'],
})
export class BodyCompositionFormComponent implements OnChanges {
  @Input() parentForm!: FormGroup;
  bodyCompositionForm!: FormGroup;

  constructor(private fb: FormBuilder) {

  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentForm'] && this.parentForm) {
      this.bodyCompositionForm = this.fb.group({
        fat: [''],
        fatMass: [''],
        leanMass: [''],
        biceps: [''],
        triceps: [''],
        chest: [''],
        midAxillary: [''],
        subscapular: [''],
        suprailiac: [''],
        abdomen: [''],
        thigh: [''],
        calf: [''],
        wrist: [''],
        femur: [''],
        humerus: [''],
        ankle: ['']
      });
      this.parentForm.addControl('bodyComposition', this.bodyCompositionForm);
    }
  }

}
