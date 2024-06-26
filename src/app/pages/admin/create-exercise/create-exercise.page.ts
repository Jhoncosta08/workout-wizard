import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {WorkoutService} from '../../../services/workout.service';
import {ActivatedRoute} from '@angular/router';
import {ToastService} from '../../../services/toast.service';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-create-exercise',
  templateUrl: './create-exercise.page.html',
  styleUrls: ['./create-exercise.page.scss'],
})
export class CreateExercisePage {
  exercisesForm: FormGroup;
  workoutId: string | null = null;
  workoutName: string = ''


  constructor(
    private fb: FormBuilder,
    private workoutService: WorkoutService,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private navControl: NavController
  ) {
    this.workoutId = this.route.snapshot.paramMap.get('id');
    this.setWorkoutName();
    this.exercisesForm = this.fb.group({
      name: ['', Validators.required],
      photo: ['', Validators.required],
      description: ['', Validators.required],
    });
  }


  onSaveExercise(): void {
    const exercises = this.exercisesForm.value;
    if (!this.exercisesForm.invalid && this.workoutId) {
      this.workoutService.addWorkoutExercises(this.workoutId, exercises).then((): void => {
        this.toastService.presentSuccessToast('Exercicio cadastrado com sucesso.').then((): void => {
          void this.navControl.navigateForward('/home');
        })
      }).catch(err => {
        console.error('Error in onSaveExercise: ', err);
        void this.toastService.presentErrorToast('Ocorreu um erro!');
      });
    } else {
      void this.toastService.presentErrorToast('Formulário inválido!');
    }
  }


  setWorkoutName(): void {
    if (this.workoutId) {
      this.workoutService.getWorkoutName(this.workoutId).subscribe({
        next: (workoutName: string): void => {
          this.workoutName = workoutName;
        },
        error: err => {
          console.error('Error in setWorkoutName: ', err);
        }
      });
    }
  }


}
