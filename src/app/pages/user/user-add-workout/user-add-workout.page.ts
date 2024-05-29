import {Component, ViewChild} from '@angular/core';
import {WorkoutInterface} from '../../../interfaces/workout.interface';
import {AllWorkoutsComponent} from '../../../components/all-workouts/all-workouts.component';
import {ExercisesInterface} from '../../../interfaces/exercises.interface';
import {UserWorkoutService} from '../../../services/user-workout.service';
import {AuthService} from '../../../services/auth.service';
import {UserInterface} from '../../../interfaces/user.interface';
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

  constructor(
    private userWorkoutService: UserWorkoutService,
    private authService: AuthService,
    private navControl: NavController,
    private route: ActivatedRoute,
    private workoutService: WorkoutService
  ) {}

  ionViewWillEnter(): void {
    this.workoutId = this.route.snapshot.paramMap.get('id');
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
    this.authService.user.subscribe((user: UserInterface | null): void => {
      if (this.selectedWorkout && user && user.uid) {
        this.userWorkoutService.saveNewWorkout(
          user.uid, this.selectedWorkout.id, this.selectedWorkout.name, exercises
        ).then((): void => {
          void this.navControl.navigateForward('/home');
        }).catch(err => {
          console.error('Error: ', err);
        })
      }
    })
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
