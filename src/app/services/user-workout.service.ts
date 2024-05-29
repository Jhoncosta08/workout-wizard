import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {ExercisesInterface} from '../interfaces/exercises.interface';
import {UserWorkoutInterface} from '../interfaces/user-workout.interface';
import 'firebase/compat/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {WorkoutInterface} from '../interfaces/workout.interface';

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
          id: workoutId,
          name: workoutName,
          exercises: exercises
        }
      ]
    } as UserWorkoutInterface;
    const docRef: any = await userWorkoutsCollection.add(userWorkout);
    const id: string = docRef.id;
    const workoutData = { id: id };
    await docRef.update(workoutData);
  }

  getAllUserWorkout(): Observable<any> {
    return this.firestore.collection('userWorkouts').valueChanges().pipe(map((userWorkouts: any[]) => {
      if (userWorkouts) {
        return userWorkouts;
      } else {
        throw new Error('Workouts not found');
      }
    }));
  }

  getUserWorkoutById(userWorkoutId: string): Observable<UserWorkoutInterface> {
    return this.firestore.collection('userWorkouts').doc(userWorkoutId).valueChanges().pipe(map((userWorkout: any) => {
      if (userWorkout) {
        return userWorkout;
      } else {
        throw new Error('Workouts not found');
      }
    }));
  }

  getUserWorkout(userWorkoutId: string, workoutId?: string): Observable<WorkoutInterface[]> {
    return this.firestore.collection('userWorkouts').doc(userWorkoutId).valueChanges().pipe(map((userWorkout: any) => {
      const workouts: WorkoutInterface[] = userWorkout.workouts;
      const filteredWorkout: WorkoutInterface[] = workouts.filter((workout: WorkoutInterface): boolean => workout.id === workoutId);
      if (filteredWorkout) {
        return filteredWorkout;
      } else {
        throw new Error('Workouts not found');
      }
    }));
  }

}
