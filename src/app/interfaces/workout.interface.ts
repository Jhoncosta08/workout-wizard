import {ExercisesInterface} from './exercises.interface';


export interface WorkoutInterface extends ExercisesInterface{
  id: string,
  name: string,
  exercises: ExercisesInterface[]
}
