import {Component, Input, Output} from '@angular/core';
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
  @Output() allSelectedExercises: ExercisesInterface[] = [];
  showDescriptionToggle: boolean = true;

  constructor(private navControl: NavController) { }

  onSelectedExercise(exercise: ExercisesInterface): void {
    const exerciseAlreadyAdded: boolean = this.allSelectedExercises.some((item: ExercisesInterface): boolean => item.id === exercise.id);
    if (!exerciseAlreadyAdded) {
      this.allSelectedExercises.push(exercise);
    }
  }

  removeTheSelectedExercise(exercise: ExercisesInterface): void {
    const index: number = this.allSelectedExercises.findIndex((item: ExercisesInterface) => item.id === exercise.id);
    if (index !== -1) {
      this.allSelectedExercises.splice(index, 1);
    }
  }

  goToExerciseDetail(exerciseId: string): void {
    void this.navControl.navigateForward(`exercise/detail/${exerciseId}`);
  }

  showAllDescription(): void {
    this.showDescriptionToggle = !this.showDescriptionToggle;
  }

  seeMoreBtnAction(exerciseId: string): void {
    switch (this.listType) {
      case "add":
        this.showAllDescription();
        break;
      case "detail":
        this.goToExerciseDetail(exerciseId);
        break;
    }
  }

}
