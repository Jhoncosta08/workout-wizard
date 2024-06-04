import { Component } from '@angular/core';
import {WorkoutService} from '../../../services/workout.service';
import {ActivatedRoute} from '@angular/router';
import {WorkoutInterface} from '../../../interfaces/workout.interface';
import {ExercisesInterface} from '../../../interfaces/exercises.interface';

@Component({
  selector: 'app-all-workouts-list',
  templateUrl: './all-workouts-list.page.html',
  styleUrls: ['./all-workouts-list.page.scss'],
})
export class AllWorkoutsListPage {
  workoutId: string | null = null;
  currentWorkout: WorkoutInterface | null = null;
  exercises: ExercisesInterface[] = [];
  exercisesNames: string[] = [];
  seeMoreName: string[] = [];
  showSpinner: boolean = true;

  constructor(
    private workoutService: WorkoutService,
    private route: ActivatedRoute
  ) {
    this.workoutId = this.route.snapshot.paramMap.get('id');
  }


  ionViewWillEnter(): void {
    this.getAllWorkouts();
  }


  getAllWorkouts(): void {
    this.showSpinner = true;
    if (this.workoutId) {
      this.workoutService.getWorkoutById(this.workoutId).subscribe({
        next: (workout: WorkoutInterface): void => {
          this.currentWorkout = workout;
          this.exercises = workout.exercises as unknown as ExercisesInterface[];
          this.showSpinner = false;
        },
        error: err => {
          this.currentWorkout = null;
          this.exercises = [];
          this.showSpinner = false;
          console.error('error in getAllWorkouts', err);
        }
      })
    } else {
      this.showSpinner = false;
    }
  }


  addOrRemoveItemToArray(array: string[], itemName: string): void {
    const name: string = itemName.trim().toLowerCase();
    if (!array.includes(name)) {
      array.push(name);
    } else {
      const index: number = array.indexOf(name);
      if (index != -1) array.splice(index, 1);
    }
  }


  ionViewWillLeave(): void {
    this.currentWorkout = null;
    this.exercises = [];
    this.showSpinner = false;
  }

}
