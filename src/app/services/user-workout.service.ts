import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {ExercisesInterface} from '../interfaces/exercises.interface';
import {UserWorkoutInterface} from '../interfaces/user-workout.interface';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserWorkoutService {

  constructor(private firestore: AngularFirestore) { }

  async saveNewWorkout(userId: string, workoutId: string, workoutName: string, exercises: ExercisesInterface[]): Promise<void> {
    const userWorkoutsCollection = this.firestore.collection('userWorkouts');
    const userWorkout: UserWorkoutInterface = {
      userId: userId,
      workouts: [
        {
          workoutId: workoutId,
          workoutName: workoutName,
          exercises: exercises
        }
      ]
    } as UserWorkoutInterface;
    await userWorkoutsCollection.add(userWorkout);
  }

}
