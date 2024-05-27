import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ToastService} from '../../../services/toast.service';
import {NavController} from '@ionic/angular';
import {WorkoutService} from '../../../services/workout.service';

@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.page.html',
  styleUrls: ['./create-workout.page.scss'],
})
export class CreateWorkoutPage {
  workout: FormControl = new FormControl('', Validators.required);

  constructor(
    private toastService: ToastService,
    private navControl: NavController,
    private workoutService: WorkoutService
  ) {}

  onSaveWorkout(): void {
    const workoutName = this.workout.value;
    if (workoutName) {
      this.workoutService.createWorkout(workoutName).then((res: any): void => {
        this.toastService.presentSuccessToast('Treino criado com sucesso').then((): void => {
          void this.navControl.navigateForward(`admin/create-exercise/${res.id}`);
        });
      }).catch(err => {
        console.error('error in create workout: ', err);
        void this.toastService.presentErrorToast('Ocorreu um erro!');
      })
    } else {
      void this.toastService.presentErrorToast('Formulário inválido!');
    }
  }

}
