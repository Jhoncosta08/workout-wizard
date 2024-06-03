import { Component } from '@angular/core';
import {UserInterface} from '../../../interfaces/user.interface';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {UserWorkoutService} from '../../../services/user-workout.service';
import {UserWorkoutInterface} from '../../../interfaces/user-workout.interface';
import {ExercisesInterface} from '../../../interfaces/exercises.interface';
import {WorkoutInterface} from '../../../interfaces/workout.interface';
import {ToastService} from '../../../services/toast.service';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-start-training',
  templateUrl: './start-training.page.html',
  styleUrls: ['./start-training.page.scss'],
})
export class StartTrainingPage {
  user: UserInterface | null = null;
  workoutId: string | null = null;
  workout: UserWorkoutInterface | null = null;
  exercises: ExercisesInterface[] = [];
  finishedWorkouts: string[] = [];
  currentWorkout: ExercisesInterface | null = null;
  activeWork: number = 0;


  constructor(
    private authService: AuthService,
    private userWorkoutService: UserWorkoutService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private navControl: NavController
  ) {
    this.workoutId = this.route.snapshot.paramMap.get('id');
  }


  ionViewWillEnter(): void {
    this.cleanPage();
    this.authService.user.subscribe((user: UserInterface | null): void => {
      this.user = user;
    });
    this.getWorkout();
  }


  cleanPage(): void {
    this.activeWork = 0;
    this.currentWorkout = null;
    this.exercises = [];
    this.finishedWorkouts = [];
  }


  getWorkout(): void {
    if (this.user && this.user.uid && this.workoutId) {
      this.userWorkoutService.getUserWorkoutById(this.workoutId, this.user.uid).then((workout: UserWorkoutInterface): void => {
        this.workout = workout;
        workout.workouts.map(workout => this.exercises = [...this.exercises.concat(workout.exercises)]);
        this.currentWorkout = this.exercises[0];
      }).catch(err => {
        console.error('Error in getWorkout', err);
      })
    }
  }

  nextWorkout(): void {
    this.activeWork++;
    if (this.activeWork >= this.exercises.length) this.activeWork = 0;
    this.currentWorkout = this.exercises[this.activeWork];
  }

  previewWorkout(): void {
    this.activeWork--;
    if (this.activeWork < 0) this.activeWork = this.exercises.length - 1;
    this.currentWorkout = this.exercises[this.activeWork];
  }

  setFinishedWorkouts(): void {
    if (this.currentWorkout && !this.finishedWorkouts.includes(this.currentWorkout.name)) {
      this.finishedWorkouts.push(this.currentWorkout.name);
    }
  }

  restartWorkout(): void {
    if (this.currentWorkout && this.finishedWorkouts.includes(this.currentWorkout.name)) {
      const index: number = this.finishedWorkouts.indexOf(this.currentWorkout.name);
      if (index !== -1) {
        this.finishedWorkouts.splice(index, 1);
      }
    }
  }

  finishTheWorkout(): void {
    if (this.finishedWorkouts.length === this.exercises.length) {
      this.toast.presentSuccessToast('Treino concluído com sucesso').then((): void => {
        void this.navControl.navigateBack('/select-training');
      });
    }
  }

}
