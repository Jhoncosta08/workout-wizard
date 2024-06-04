import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExercisesInterface} from '../../interfaces/exercises.interface';
import {ActivatedRoute} from '@angular/router';
import {UserWorkoutService} from '../../services/user-workout.service';
import {WorkoutInterface} from '../../interfaces/workout.interface';
import {UserInterface} from '../../interfaces/user.interface';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
})
export class ExerciseListComponent implements OnInit {
  @Input({required: true}) exercises: ExercisesInterface[] = [];
  @Input({required: true}) user: UserInterface | null = null;
  @Input({required: true}) workout: WorkoutInterface | null = null;
  @Input({required: true}) listType: 'detail' | 'add' = 'detail';
  @Output() emitExercises: EventEmitter<ExercisesInterface[]> = new EventEmitter<ExercisesInterface[]>();
  allSelectedExercises: ExercisesInterface[] = [];
  userWorkoutId: string | null = null;
  workoutId: string | null = null;
  exercisesNames: string[] = [];
  seeMoreName: string[] = [];
  showSpinner: boolean = false;


  constructor(
    private route: ActivatedRoute,
    private userWorkoutService: UserWorkoutService,
    ) {
    this.userWorkoutId = this.route.snapshot.paramMap.get('workoutId');
    this.workoutId = this.route.snapshot.paramMap.get('id');
  }


  ngOnInit(): void {
    this.showSpinner = false;
    this.setExercisesAlreadySaved();
  }


  onSelectedExercise(exercise: ExercisesInterface): void {
    const exerciseAlreadyAdded: boolean = this.allSelectedExercises.some(
      (item: ExercisesInterface): boolean =>
        item.name.toLowerCase().trim() === exercise.name.trim().toLowerCase()
    );
    if (!exerciseAlreadyAdded) this.allSelectedExercises.push(exercise);
    if (exercise && exercise.name) this.addOrRemoveItemToArray(this.exercisesNames, exercise.name);
  }


  removeTheSelectedExercise(exercise: ExercisesInterface): void {
    const index: number = this.allSelectedExercises.findIndex(
      (item: ExercisesInterface): boolean =>
        item.name.trim().toLowerCase() === exercise.name.trim().toLowerCase()
    );
    if (index !== -1) this.allSelectedExercises.splice(index, 1);
    if (exercise && exercise.name) this.addOrRemoveItemToArray(this.exercisesNames, exercise.name);
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


  setExercisesAlreadySaved(): void {
    if (this.workoutId && this.userWorkoutId) {
      if (this.user && this.user.uid) {
        this.showSpinner = true;
        this.userWorkoutService.getUserWorkout(this.userWorkoutId,this.user.uid, this.workoutId).then((userWorkout: WorkoutInterface[]): void => {
          const exercises: ExercisesInterface[] = userWorkout[0]?.exercises;
          if (exercises && exercises.length > 0) {
            exercises.map((exercise: ExercisesInterface): void => {
              this.onSelectedExercise(exercise);
            });
            this.showSpinner = false;
          } else {
            this.showSpinner = false;
          }
        }).catch(err => {
          this.showSpinner = false;
        });
      } else {
        this.showSpinner = false;
      }
    } else {
      this.showSpinner = false;
    }
  }


}
