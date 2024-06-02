import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-anthropometry-form',
  templateUrl: './anthropometry-form.component.html',
  styleUrls: ['./anthropometry-form.component.scss'],
})
export class AnthropometryFormComponent implements OnChanges {
  @Input() parentForm!: FormGroup;
  anthropometryForm!: FormGroup;


  constructor(private fb: FormBuilder) {}


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentForm'] && this.parentForm) {
      this.anthropometryForm  = this.fb.group({
        shoulder: ['', [Validators.required]],
        waist: ['', [Validators.required]],
        abdomen: ['', [Validators.required]],
        hip: ['', [Validators.required]],
        relaxedThigh: ['', [Validators.required]],
        calf: ['', [Validators.required]],
        relaxedArm: ['', [Validators.required]],
        contractedArm: ['', [Validators.required]]
      });
      this.parentForm.addControl('anthropometry', this.anthropometryForm);
    }
  }


}
