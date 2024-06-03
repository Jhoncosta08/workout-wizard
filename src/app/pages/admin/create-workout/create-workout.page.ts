import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {ToastService} from '../../../services/toast.service';
import {NavController} from '@ionic/angular';
import {WorkoutService} from '../../../services/workout.service';
import {WorkoutInterface} from '../../../interfaces/workout.interface';


@Component({
  selector: 'app-create-workout',
  templateUrl: './create-workout.page.html',
  styleUrls: ['./create-workout.page.scss'],
})
export class CreateWorkoutPage {
  workout: FormControl = new FormControl('', Validators.required);
  workoutType: 'add' | 'update' | '' = '';
  workouts: WorkoutInterface[] = [];


  constructor(
    private toastService: ToastService,
    private navControl: NavController,
    private workoutService: WorkoutService
  ) {}


  ionViewWillEnter(): void {
    this.getAllWorkouts();
  }


  onSaveWorkout(): void {
    const workoutName = this.workout.value;
    if (workoutName) {
      this.workoutService.createWorkout(workoutName).then((res: any): void => {
        this.toastService.presentSuccessToast('Treino criado com sucesso').then((): void => {
          void this.navControl.navigateForward(`admin/create-exercise/${res.id}`);
        });
      }).catch(err => {
        console.error('error in onSaveWorkout: ', err);
        void this.toastService.presentErrorToast('Ocorreu um erro!');
      })
    } else {
      void this.toastService.presentErrorToast('Formulário inválido!');
    }
  }


  getClickedWorkout(workout: WorkoutInterface): void {
    if (workout) {
      void this.navControl.navigateForward(`/admin/create-exercise/${workout.id}`);
    }
  }


  changeActionType(actionType: 'add' | 'update' | ''): void {
    this.workoutType = actionType;
  }


  getAllWorkouts(): void {
    this.workoutService.getAllWorkouts().subscribe({
      next: (workouts: WorkoutInterface[]): void => {
        this.workouts = workouts;
      },
      error: err => {
        this.workouts = [];
        console.error('Error in get all workouts: ', err);
      }
    })
  }


}
