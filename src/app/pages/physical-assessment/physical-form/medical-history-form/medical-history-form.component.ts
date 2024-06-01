import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-medical-history-form',
  templateUrl: './medical-history-form.component.html',
  styleUrls: ['./medical-history-form.component.scss'],
})
export class MedicalHistoryFormComponent implements OnChanges {
  @Input() parentForm!: FormGroup;
  medicalHistoryForm!: FormGroup


  constructor(private fb: FormBuilder) {

  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['parentForm'] && this.parentForm) {
      this.medicalHistoryForm = this.fb.group({
        goal: [''],
        activityHistory: [''],
        surgeries: [''],
        medications: [''],
        fracture: [''],
        eatingHabits: [''],
        otherPathology: [''],
        profession: [''],
        mealFrequency: [''],
        supplements: [''],
        waterIntake: [''],
        inactivityTime: [''],
        sleepHours: [''],
        sleepQuality: [''],
        stressLevel: [''],
        selfImage: [''],
        selfEsteem: [''],
        dailyDisposition: [''],
        weeklyTrainingFrequency: [''],
        availableTime: [''],
        osteoarthritis: [''],
        eatingHabitScore: [''],
        painLevel: ['']
      });
      this.parentForm.addControl('medicalHistoryForm', this.medicalHistoryForm);
    }
  }


}
