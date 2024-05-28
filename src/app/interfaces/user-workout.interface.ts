import {ExercisesInterface} from './exercises.interface';

export interface UserWorkoutInterface extends ExercisesInterface {
  userId: string;
  workouts: [
    {
      workoutId: string;
      workoutName: string;
      exercises: ExercisesInterface[];
    }
  ];
}
