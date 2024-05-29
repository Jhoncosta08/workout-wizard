import {Component, ViewChild} from '@angular/core';
import {WorkoutInterface} from '../../../interfaces/workout.interface';
import {AllWorkoutsComponent} from '../../../components/all-workouts/all-workouts.component';
import {ExercisesInterface} from '../../../interfaces/exercises.interface';
import {UserWorkoutService} from '../../../services/user-workout.service';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {WorkoutService} from '../../../services/workout.service';

@Component({
  selector: 'app-user-add-workout',
  templateUrl: './user-add-workout.page.html',
  styleUrls: ['./user-add-workout.page.scss'],
})
export class UserAddWorkoutPage {
  @ViewChild(AllWorkoutsComponent) allWorkoutsComponent!: AllWorkoutsComponent;
  selectedWorkout: WorkoutInterface | null = null;
  workoutId: string | null = null;
  userWorkoutId: string | null = null;

  constructor(
    private userWorkoutService: UserWorkoutService,
    private navControl: NavController,
    private route: ActivatedRoute,
    private workoutService: WorkoutService
  ) {}

  ionViewWillEnter(): void {
    this.workoutId = this.route.snapshot.paramMap.get('id');
    this.userWorkoutId = this.route.snapshot.paramMap.get('workoutId');
    if (this.workoutId) {
      this.getUserWorkout();
    } else {
      if (this.allWorkoutsComponent) {
        this.allWorkoutsComponent.getAllWorkouts();
      }
    }
  }

  getClickedWorkout(workout: WorkoutInterface): void {
    if (workout) {
      this.selectedWorkout = workout;
    }
  }

  saveExercises(exercises: ExercisesInterface[]): void {
    if (this.userWorkoutId && this.workoutId) {
      this.userWorkoutService.getUserWorkout(this.userWorkoutId, this.workoutId).then((userWorkout: WorkoutInterface[]): void => {
        if (userWorkout && userWorkout.length > 0) {
          this.updateWorkoutExercises(exercises);
        } else {
          this.newWorkoutGroup(exercises);
        }
      }).catch(err => {
        console.error('Error: ', err);
      });
    } else {
      if (this.selectedWorkout) {
        this.userWorkoutService.saveNewWorkout(this.selectedWorkout.id, this.selectedWorkout.name, exercises).then((): void => {
          void this.navControl.navigateForward('/home');
        }).catch(err => {
          console.error('Error: ', err);
        });
      }
    }
  }

  newWorkoutGroup(exercises: ExercisesInterface[]): void {
    if (this.selectedWorkout && this.userWorkoutId) {
      const newWorkout: WorkoutInterface = {
        id: this.selectedWorkout.id,
        name: this.selectedWorkout.name,
        exercises: exercises
      } as WorkoutInterface;

      this.userWorkoutService.addNewWorkoutGroup(newWorkout, this.userWorkoutId).then((): void => {
        void this.navControl.navigateBack(`/user-workout/${this.userWorkoutId}`);
      }).catch(err => {
        console.error('Error: ', err);
      });
    }
  }

  updateWorkoutExercises(exercises: ExercisesInterface[]): void {
    if (this.userWorkoutId && this.workoutId) {
      this.userWorkoutService.updateExercises(this.userWorkoutId, this.workoutId, exercises).then((): void => {
        void this.navControl.navigateBack(`/user-workout/${this.userWorkoutId}`);
      }).catch(err => {
        console.error('Error: ', err);
      });
    }
  }

  getUserWorkout(): void {
    if (this.workoutId) {
      this.workoutService.getWorkoutById(this.workoutId).subscribe({
        next: (workouts: WorkoutInterface): void => {
          this.selectedWorkout = workouts;
        },
        error: err => {
          console.error('Error: ', err);
        }
      });
    }
  }

}
