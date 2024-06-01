import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-anthropometry-form',
  templateUrl: './anthropometry-form.component.html',
  styleUrls: ['./anthropometry-form.component.scss'],
})
export class AnthropometryFormComponent implements OnChanges {
  @Input() parentForm!: FormGroup;
  anthropometryForm!: FormGroup;

  constructor(private fb: FormBuilder) {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentForm'] && this.parentForm) {
      this.anthropometryForm  = this.fb.group({
        shoulder: [''],
        waist: [''],
        abdomen: [''],
        hip: [''],
        relaxedThigh: [''],
        calf: [''],
        relaxedArm: [''],
        contractedArm: ['']
      });
      this.parentForm.addControl('anthropometry', this.anthropometryForm);
    }
  }


}
