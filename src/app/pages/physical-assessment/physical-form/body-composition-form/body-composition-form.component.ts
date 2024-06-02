import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-body-composition-form',
  templateUrl: './body-composition-form.component.html',
  styleUrls: ['./body-composition-form.component.scss'],
})
export class BodyCompositionFormComponent implements OnChanges {
  @Input() parentForm!: FormGroup;
  bodyCompositionForm!: FormGroup;


  constructor(private fb: FormBuilder) {}


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentForm'] && this.parentForm) {
      this.bodyCompositionForm = this.fb.group({
        fat: [''],
        fatMass: [''],
        leanMass: [''],
        biceps: ['', [Validators.required]],
        triceps: ['', [Validators.required]],
        chest: ['', [Validators.required]],
        midAxillary: ['', [Validators.required]],
        subscapular: ['', [Validators.required]],
        suprailiac: ['', [Validators.required]],
        abdomen: ['', [Validators.required]],
        thigh: ['', [Validators.required]],
        calf: ['', [Validators.required]],
        wrist: [''],
        femur: [''],
        humerus: [''],
        ankle: ['']
      });
      this.parentForm.addControl('bodyComposition', this.bodyCompositionForm);
    }
  }


}
