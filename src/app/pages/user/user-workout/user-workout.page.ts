import { Component } from '@angular/core';
import {UserWorkoutService} from '../../../services/user-workout.service';
import {ActivatedRoute} from '@angular/router';
import {UserWorkoutInterface} from '../../../interfaces/user-workout.interface';
import {WorkoutInterface} from '../../../interfaces/workout.interface';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-user-workout',
  templateUrl: './user-workout.page.html',
  styleUrls: ['./user-workout.page.scss'],
})
export class UserWorkoutPage {
  workoutId: string | null = null;
  userWorkout: UserWorkoutInterface | null = null;
  workouts: WorkoutInterface[] = [];


  constructor(
    private userWorkoutService: UserWorkoutService,
    private route: ActivatedRoute,
    private navControl: NavController
  ) { }


  ionViewWillEnter(): void {
    this.workoutId = this.route.snapshot.paramMap.get('id');
    this.getUserWorkoutDoc();
  }


  getUserWorkoutDoc(): void {
    if (this.workoutId) {
      this.userWorkoutService.getUserWorkoutById(this.workoutId).then((workout: UserWorkoutInterface): void => {
        this.userWorkout = workout;
        this.workouts = workout.workouts as unknown as WorkoutInterface[];
      }).catch(err => {
        console.error('Error in getUserWorkoutDoc: ', err);
      });
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
      const workoutId: string = this.userWorkout.id;
      this.userWorkoutService.deleteWorkoutFromArray(workoutId, workoutToRemoveId).then((): void => {
        this.workouts = [];
        this.userWorkout = null;
        this.getUserWorkoutDoc();
      }).catch(err => {
        console.error('Error in deleteWorkout', err);
      });
    }
  }


  deleteAllWorkout(): void {
    if (this.userWorkout && this.userWorkout.id) {
      this.userWorkoutService.deleteWorkout(this.userWorkout.id).then((): void => {
        void this.navControl.navigateForward('/home');
      }).catch(err => {
        console.error('Error in deleteWorkout', err);
      });
    }
  }


}
