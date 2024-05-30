import {Component, EventEmitter, Output} from '@angular/core';
import {WorkoutService} from '../../services/workout.service';
import {WorkoutInterface} from '../../interfaces/workout.interface';


@Component({
  selector: 'app-all-workouts',
  templateUrl: './all-workouts.component.html',
  styleUrls: ['./all-workouts.component.scss'],
})
export class AllWorkoutsComponent {
  workouts: WorkoutInterface[] = [];
  @Output() clickedWorkout: EventEmitter<WorkoutInterface> = new EventEmitter<WorkoutInterface>();


  constructor(private workoutService: WorkoutService) {}


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
