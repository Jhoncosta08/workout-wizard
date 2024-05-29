import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'exerciseImg',
  standalone: true
})
export class ExerciseImgPipe implements PipeTransform {

  private exerciseImages: { [exerciseName: string]: string } = {
    'peito': 'assets/icon/chest.png',
    'costa': 'assets/icon/back.png',
    'ombro': 'assets/icon/shoulder.png',
    'biceps': 'assets/icon/biceps.png',
    'triceps': 'assets/icon/triceps.png',
    'antebraco': 'assets/icon/forearm.png',
    'perna': 'assets/icon/legs.png',
    'coxa': 'assets/icon/thigh.png',
    'panturrilha': 'assets/icon/calf.png',
    'abdomen': 'assets/icon/abdomen.png',
  };

  transform(exerciseName: string): string {
    return this.exerciseImages[exerciseName.toLowerCase()] || 'assets/icon/default-workout.png';
  }

}
