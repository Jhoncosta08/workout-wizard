import { Component } from '@angular/core';
import {WorkoutInterface} from '../../interfaces/workout.interface';
import {WorkoutService} from '../../services/workout.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-all-workouts',
  templateUrl: './all-workouts.page.html',
  styleUrls: ['./all-workouts.page.scss'],
})
export class AllWorkoutsPage {
  workouts: WorkoutInterface[] = [];
  showSpinner: boolean = true;


  constructor(
    private workoutService: WorkoutService,
    private navControl: NavController
  ) { }


  ionViewWillEnter(): void {
    this.getAllWorkouts();
  }


  getAllWorkouts(): void {
    this.workoutService.getAllWorkouts().subscribe({
      next: (workouts: WorkoutInterface[]): void => {
        this.workouts = workouts;
        this.showSpinner = false;
      },
      error: err => {
        this.workouts = [];
        this.showSpinner = false;
        console.error('Error in get all workouts: ', err);
      }
    })
  }


  moveToWorkoutList(workout: WorkoutInterface): void {
    if (workout) {
      void this.navControl.navigateForward(`/all-workouts/all-workouts-list/${workout.id}`);
    }
  }


  ionViewWillLeave(): void {
    this.showSpinner = false;
  }

}
