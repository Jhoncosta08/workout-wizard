import { Component } from '@angular/core';
import {WorkoutInterface} from '../../../interfaces/workout.interface';
import {NavController} from '@ionic/angular';
import {UserInterface} from '../../../interfaces/user.interface';
import {UserWorkoutService} from '../../../services/user-workout.service';
import {AuthService} from '../../../services/auth.service';
import {UserWorkoutInterface} from '../../../interfaces/user-workout.interface';

@Component({
  selector: 'app-select-training',
  templateUrl: './select-training.page.html',
  styleUrls: ['./select-training.page.scss'],
})
export class SelectTrainingPage{
  workouts: UserWorkoutInterface[] = [];
  user: UserInterface | null = null;


  constructor(
    private navControl: NavController,
    private userWorkoutService: UserWorkoutService,
    private authService: AuthService
  ) { }


  ionViewWillEnter(): void {
    this.authService.user.subscribe((user: UserInterface | null): void => {
      this.user = user;
    })
    this.getUserWorkouts();
  }


  getClickedWorkout(workout: UserWorkoutInterface): void {
    if (workout) {
      void this.navControl.navigateForward(`/start-training/${workout.id}`);
    }
  }


  getUserWorkouts(): void {
    if (this.user && this.user.uid) {
      this.userWorkoutService.getAllUserWorkout(this.user.uid).then((workouts: UserWorkoutInterface[]): void => {
        this.workouts = workouts;
      }).catch(err => {
        this.workouts = [];
        console.error('Error in get user workouts', err);
      })
    }
  }


}
