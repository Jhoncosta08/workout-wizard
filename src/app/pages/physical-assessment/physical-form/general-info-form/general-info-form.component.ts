import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-general-info-form',
  templateUrl: './general-info-form.component.html',
  styleUrls: ['./general-info-form.component.scss'],
})
export class GeneralInfoFormComponent implements OnChanges {
  @Input() parentForm!: FormGroup;
  generalInfoForm!: FormGroup;


  constructor(private fb: FormBuilder) {}


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentForm'] && this.parentForm) {
      this.generalInfoForm = this.fb.group({
        weight: ['', [Validators.required]],
        height: ['', [Validators.required]]
      });
      this.parentForm.addControl('generalInfo', this.generalInfoForm);
    }
  }


}
