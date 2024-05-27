import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ToastService} from '../../../services/toast.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.page.html',
  styleUrls: ['./create-workout.page.scss'],
})
export class CreateWorkoutPage {
  workout: FormControl = new FormControl('', Validators.required);

  constructor(
    private toastService: ToastService,
    private navControl: NavController
  ) {}

  onSaveWorkout(): void {
    const workoutName = this.workout.value;
    if (workoutName) {
      console.log('treino: ', workoutName);
    }
  }

}
