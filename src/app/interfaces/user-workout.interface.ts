import {ExercisesInterface} from './exercises.interface';


export interface UserWorkoutInterface extends ExercisesInterface {
  userId: string;
  workouts: [
    {
      id: string;
      name: string;
      exercises: ExercisesInterface[];
    }
  ];
}
