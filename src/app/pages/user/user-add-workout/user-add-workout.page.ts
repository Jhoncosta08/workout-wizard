import {Component, ViewChild} from '@angular/core';
import {WorkoutInterface} from '../../../interfaces/workout.interface';
import {AllWorkoutsComponent} from '../../../components/all-workouts/all-workouts.component';

@Component({
  selector: 'app-user-add-workout',
  templateUrl: './user-add-workout.page.html',
  styleUrls: ['./user-add-workout.page.scss'],
})
export class UserAddWorkoutPage {
  @ViewChild(AllWorkoutsComponent) allWorkoutsComponent!: AllWorkoutsComponent;
  selectedWorkout: WorkoutInterface | null = null;

  constructor() { }

  ionViewWillEnter(): void {
    if (this.allWorkoutsComponent) {
      this.allWorkoutsComponent.getAllWorkouts();
    }
  }

  getClickedWorkout(workout: WorkoutInterface): void {
    if (workout) {
      this.selectedWorkout = workout;
    }
  }

}
