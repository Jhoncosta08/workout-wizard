import { Component } from '@angular/core';
import {UserWorkoutService} from '../../../services/user-workout.service';
import {ActivatedRoute} from '@angular/router';
import {UserWorkoutInterface} from '../../../interfaces/user-workout.interface';
import {WorkoutInterface} from '../../../interfaces/workout.interface';
import {NavController} from '@ionic/angular';
import {SpinnerService} from '../../../services/spinner.service';
import {ToastService} from '../../../services/toast.service';
import {UserInterface} from '../../../interfaces/user.interface';
import {AuthService} from '../../../services/auth.service';


@Component({
  selector: 'app-user-workout',
  templateUrl: './user-workout.page.html',
  styleUrls: ['./user-workout.page.scss'],
})
export class UserWorkoutPage {
  workoutId: string | null = null;
  userWorkout: UserWorkoutInterface | null = null;
  workouts: WorkoutInterface[] = [];
  user: UserInterface | null = null;


  constructor(
    private userWorkoutService: UserWorkoutService,
    private route: ActivatedRoute,
    private navControl: NavController,
    private spinnerService: SpinnerService,
    private toastService: ToastService,
    private authService: AuthService
  ) { }


  ionViewWillEnter(): void {
    this.workoutId = this.route.snapshot.paramMap.get('id');
    this.authService.user.subscribe((user: UserInterface | null): void => {
      this.user = user;
    });
    this.getUserWorkoutDoc();
  }


  getUserWorkoutDoc(): void {
    if (this.workoutId) {
      if (this.user && this.user.uid) {
        this.userWorkoutService.getUserWorkoutById(this.workoutId, this.user.uid).then((workout: UserWorkoutInterface): void => {
          this.userWorkout = workout;
          this.workouts = workout.workouts as unknown as WorkoutInterface[];
        }).catch(err => {
          console.error('Error in getUserWorkoutDoc: ', err);
        });
      }
    }
  }


  moveRouteToEditWorkout(workoutId?: string): void {
    if (this.userWorkout && this.userWorkout.id) {
      const urlParams: string = workoutId ? `${this.userWorkout.id}/${workoutId}` : `${this.userWorkout.id}`;
      const url: string = `/user-add-workout/${urlParams}`;
      void this.navControl.navigateForward(url);
    }
  }


  deleteWorkout(workoutToRemoveId: string): void {
    if (this.userWorkout && this.userWorkout.id) {
      if (this.user && this.user.uid) {
        this.spinnerService.show('Excluindo...');
        const workoutId: string = this.userWorkout.id;
        this.userWorkoutService.deleteWorkoutFromArray(workoutId, workoutToRemoveId, this.user.uid).then((): void => {
          this.workouts = [];
          this.userWorkout = null;
          this.getUserWorkoutDoc();
          this.spinnerService.hide();
          void this.toastService.presentSuccessToast('Treino excluido com sucesso!');
        }).catch(err => {
          console.error('Error in deleteWorkout', err);
          this.spinnerService.hide();
          void this.toastService.presentErrorToast('Erro ao excluir o treino!');
        });
      }
    }
  }


  deleteAllWorkout(): void {
    if (this.userWorkout && this.userWorkout.id) {
      if (this.user && this.user.uid) {
        this.spinnerService.show('Excluindo todo o treino...');
        this.userWorkoutService.deleteWorkout(this.userWorkout.id, this.user.uid).then((): void => {
          void this.toastService.presentSuccessToast('Todo o treino foi excluido!');
          this.navControl.navigateForward('/home').then(() => this.spinnerService.hide());
        }).catch(err => {
          this.spinnerService.hide();
          console.error('Error in deleteWorkout', err);
          void this.toastService.presentErrorToast('Erro ao excluir o treino todo!');
        });
      }
    }
  }


}
