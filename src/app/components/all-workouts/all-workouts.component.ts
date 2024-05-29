import {Component, EventEmitter, Output} from '@angular/core';
import {WorkoutService} from '../../services/workout.service';
import {SpinnerService} from '../../services/spinner.service';
import {WorkoutInterface} from '../../interfaces/workout.interface';

@Component({
  selector: 'app-all-workouts',
  templateUrl: './all-workouts.component.html',
  styleUrls: ['./all-workouts.component.scss'],
})
export class AllWorkoutsComponent {
  workouts: WorkoutInterface[] = [];
  @Output() clickedWorkout: EventEmitter<WorkoutInterface> = new EventEmitter<WorkoutInterface>();


  constructor(
    private workoutService: WorkoutService,
    private spinner: SpinnerService
  ) {}


  getAllWorkouts(): void {
    this.spinner.show();
    this.workoutService.getAllWorkouts().subscribe({
      next: (workouts: WorkoutInterface[]): void => {
        this.workouts = workouts;
        this.spinner.hide();
      },
      error: err => {
        this.workouts = [];
        this.spinner.hide();
        console.error('Error in get all workouts: ', err);
      }
    })
  }


}
