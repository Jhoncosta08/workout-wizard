import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExercisesInterface} from '../../interfaces/exercises.interface';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {UserWorkoutService} from '../../services/user-workout.service';
import {WorkoutInterface} from '../../interfaces/workout.interface';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
})
export class ExerciseListComponent implements OnInit {
  @Input({required: true}) exercises: ExercisesInterface[] = [];
  @Input({required: true}) listType: 'detail' | 'add' = 'detail';
  @Output() emitExercises: EventEmitter<ExercisesInterface[]> = new EventEmitter<ExercisesInterface[]>();
  allSelectedExercises: ExercisesInterface[] = [];
  userWorkoutId: string | null = null;
  workoutId: string | null = null;
  showDescriptionToggle: boolean = true;
  exercisesNames: string[] = [];


  constructor(
    private navControl: NavController,
    private route: ActivatedRoute,
    private userWorkoutService: UserWorkoutService,
    ) {
    this.userWorkoutId = this.route.snapshot.paramMap.get('workoutId');
    this.workoutId = this.route.snapshot.paramMap.get('id');
  }


  ngOnInit(): void {
    this.setExercisesAlreadySaved();
  }


  onSelectedExercise(exercise: ExercisesInterface): void {
    const exerciseAlreadyAdded: boolean = this.allSelectedExercises.some(
      (item: ExercisesInterface): boolean =>
        item.name.toLowerCase().trim() === exercise.name.trim().toLowerCase()
    );
    if (!exerciseAlreadyAdded) this.allSelectedExercises.push(exercise);
    if (exercise && exercise.name) this.showIconIfIdInList(exercise.name);
  }


  removeTheSelectedExercise(exercise: ExercisesInterface): void {
    const index: number = this.allSelectedExercises.findIndex(
      (item: ExercisesInterface): boolean =>
        item.name.trim().toLowerCase() === exercise.name.trim().toLowerCase()
    );
    if (index !== -1) this.allSelectedExercises.splice(index, 1);
    if (exercise && exercise.name) this.showIconIfIdInList(exercise.name);
  }


  goToExerciseDetail(exerciseName: string): void {
    void this.navControl.navigateForward(`exercise/detail/${exerciseName}`);
  }


  showAllDescription(): void {
    this.showDescriptionToggle = !this.showDescriptionToggle;
  }


  seeMoreBtnAction(exerciseName: string): void {
    switch (this.listType) {
      case "add":
        this.showAllDescription();
        break;
      case "detail":
        this.goToExerciseDetail(exerciseName);
        break;
    }
  }


  showIconIfIdInList(exerciseName: string): void {
    const name: string = exerciseName.trim().toLowerCase();
    if (!this.exercisesNames.includes(name)) {
      this.exercisesNames.push(name);
    } else {
      const index: number = this.exercisesNames.indexOf(name);
      if (index != -1) this.exercisesNames.splice(index, 1);
    }
  }


  setExercisesAlreadySaved(): void {
    if (this.workoutId && this.userWorkoutId) {
      this.userWorkoutService.getUserWorkout(this.userWorkoutId, this.workoutId).then((userWorkout: WorkoutInterface[]): void => {
        const exercises: ExercisesInterface[] = userWorkout[0]?.exercises;
        if (exercises && exercises.length > 0) {
          exercises.map((exercise: ExercisesInterface): void => {
            this.onSelectedExercise(exercise);
          });
        }
      }).catch(err => {
        console.error('error: ', err);
      });
    }
  }


}
