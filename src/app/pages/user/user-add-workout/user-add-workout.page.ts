import {Component, ViewChild} from '@angular/core';
import {WorkoutInterface} from '../../../interfaces/workout.interface';
import {AllWorkoutsComponent} from '../../../components/all-workouts/all-workouts.component';
import {ExercisesInterface} from '../../../interfaces/exercises.interface';
import {UserWorkoutService} from '../../../services/user-workout.service';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {WorkoutService} from '../../../services/workout.service';
import {SpinnerService} from '../../../services/spinner.service';
import {ToastService} from '../../../services/toast.service';
import {UserInterface} from '../../../interfaces/user.interface';
import {AuthService} from '../../../services/auth.service';


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
  user: UserInterface | null = null;


  constructor(
    private userWorkoutService: UserWorkoutService,
    private navControl: NavController,
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private spinnerService: SpinnerService,
    private toastService: ToastService,
    private authService: AuthService
  ) {this.spinnerService.hide();}


  ionViewWillEnter(): void {
    this.workoutId = this.route.snapshot.paramMap.get('id');
    this.userWorkoutId = this.route.snapshot.paramMap.get('workoutId');
    this.authService.user.subscribe((user: UserInterface | null): void => {
      this.user = user;
    });
    if (this.workoutId) {
      this.getUserWorkout();
    } else {
      if (this.allWorkoutsComponent) this.allWorkoutsComponent.getAllWorkouts();
    }
    this.spinnerService.hide();
  }


  getClickedWorkout(workout: WorkoutInterface): void {
    this.selectedWorkout = null;
    if (this.userWorkoutId && !this.workoutId) {
      return void this.navControl.navigateForward(`/user-add-workout/${this.userWorkoutId}/${workout.id}`);
    }
    if (workout && !this.workoutId) this.selectedWorkout = workout;
  }


  saveExercises(exercises: ExercisesInterface[]): void {
    this.spinnerService.show();
    if (this.userWorkoutId && this.workoutId) {
      if (this.user && this.user.uid) {
        this.userWorkoutService.getUserWorkout(this.userWorkoutId, this.user.uid, this.workoutId).then((userWorkout: WorkoutInterface[]): void => {
          if (userWorkout && userWorkout.length > 0) {
            this.updateWorkoutExercises(exercises);
          } else {
            this.newWorkoutGroup(exercises);
          }
        }).catch(err => {
          this.spinnerService.hide();
          void this.toastService.presentErrorToast('Ocorreu um erro!');
          console.error('Error in getUserWorkout: ', err);
        });
      }
    } else {
      if (this.selectedWorkout) {
        if (this.user && this.user.uid) {
          this.userWorkoutService.saveNewWorkout(this.selectedWorkout.id, this.selectedWorkout.name, exercises, this.user.uid).then((): void => {
            this.navControl.navigateForward('/home').then((): void => {
              void this.toastService.presentSuccessToast('Novo treino cadastrado!');
              this.spinnerService.hide();
            });
          }).catch(err => {
            this.spinnerService.hide();
            console.error('Error in saveNewWorkout: ', err);
          });
        }
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

      if (this.user && this.user.uid) {
        this.userWorkoutService.addNewWorkoutGroup(newWorkout, this.userWorkoutId, this.user.uid).then((): void => {
          this.navControl.navigateBack(`/user-workout/${this.userWorkoutId}`).then((): void => {
            this.spinnerService.hide();
            void this.toastService.presentSuccessToast('Novo grupo de treino adicionado!');
          });
        }).catch(err => {
          this.spinnerService.hide();
          void this.toastService.presentErrorToast('Ocorreu um erro!');
          console.error('Error in addNewWorkoutGroup: ', err);
        });
      }
    }
  }


  updateWorkoutExercises(exercises: ExercisesInterface[]): void {
    if (this.userWorkoutId && this.workoutId) {
      if (this.user && this.user.uid) {
        this.userWorkoutService.updateExercises(this.userWorkoutId, this.workoutId, exercises, this.user.uid).then((): void => {
          this.navControl.navigateBack(`/user-workout/${this.userWorkoutId}`).then((): void => {
            this.spinnerService.hide();
            void this.toastService.presentSuccessToast('Treino atualizado!');
          });
        }).catch(err => {
          this.spinnerService.hide();
          void this.toastService.presentErrorToast('Ocorreu um erro!');
          console.error('Error in updateWorkoutExercises: ', err);
        });
      }
    }
  }


  getUserWorkout(): void {
    if (this.workoutId) {
      this.spinnerService.show();
      this.workoutService.getWorkoutById(this.workoutId).subscribe({
        next: (workouts: WorkoutInterface): void => {
          this.selectedWorkout = workouts;
          this.spinnerService.hide();
        },
        error: err => {
          console.error('Error in getUserWorkout: ', err);
          this.selectedWorkout = null;
          this.spinnerService.hide();
        }
      });
    }
    this.spinnerService.hide();
  }


  ionViewWillLeave(): void {
    this.selectedWorkout = null;
    this.spinnerService.hide();
  }


}
