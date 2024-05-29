import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ToastService} from '../../../services/toast.service';
import {NavController} from '@ionic/angular';
import {WorkoutService} from '../../../services/workout.service';
import {SpinnerService} from '../../../services/spinner.service';


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
    private workoutService: WorkoutService,
    private spinnerControl: SpinnerService,
  ) {}


  onSaveWorkout(): void {
    this.spinnerControl.show('Carregando...');
    const workoutName = this.workout.value;
    if (workoutName) {
      this.workoutService.createWorkout(workoutName).then((res: any): void => {
        this.toastService.presentSuccessToast('Treino criado com sucesso').then((): void => {
          void this.navControl.navigateForward(`admin/create-exercise/${res.id}`);
          this.spinnerControl.hide();
        });
      }).catch(err => {
        this.spinnerControl.hide();
        console.error('error in onSaveWorkout: ', err);
        void this.toastService.presentErrorToast('Ocorreu um erro!');
      })
    } else {
      this.spinnerControl.hide();
      void this.toastService.presentErrorToast('Formulário inválido!');
    }
  }


}
