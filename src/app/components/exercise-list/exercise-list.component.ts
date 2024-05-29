import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ExercisesInterface} from '../../interfaces/exercises.interface';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss'],
})
export class ExerciseListComponent {
  @Input({required: true}) exercises: ExercisesInterface[] = [];
  @Input({required: true}) listType: 'detail' | 'add' = 'detail';
  @Output() emitExercises: EventEmitter<ExercisesInterface[]> = new EventEmitter<ExercisesInterface[]>();
  allSelectedExercises: ExercisesInterface[] = [];

  showDescriptionToggle: boolean = true;
  exercisesNames: string[] = [];

  constructor(private navControl: NavController) { }

  onSelectedExercise(exercise: ExercisesInterface): void {
    const exerciseAlreadyAdded: boolean = this.allSelectedExercises.some((item: ExercisesInterface): boolean => item.name.toLowerCase().trim() === exercise.name.trim().toLowerCase());
    if (!exerciseAlreadyAdded) this.allSelectedExercises.push(exercise);
    if (exercise && exercise.name) this.showIconIfIdInList(exercise.name);
  }

  removeTheSelectedExercise(exercise: ExercisesInterface): void {
    const index: number = this.allSelectedExercises.findIndex((item: ExercisesInterface): boolean => item.name.trim().toLowerCase() === exercise.name.trim().toLowerCase());
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


}
