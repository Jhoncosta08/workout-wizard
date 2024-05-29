import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {ExercisesInterface} from '../interfaces/exercises.interface';
import * as firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {WorkoutInterface} from '../interfaces/workout.interface';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private firestore: AngularFirestore) { }

  async createWorkout(workoutName: string): Promise<any> {
    const collection: any = this.firestore.collection('workouts');
    const docRef: any = await collection.add({ name: workoutName });
    const id: string = docRef.id;
    const workoutData = { id: id, name: workoutName };
    await docRef.update(workoutData);
    return workoutData;
  }

  addWorkoutExercises(workoutId: string, workoutExercises: ExercisesInterface[]): Promise<void> {
    return this.firestore.collection('workouts').doc(workoutId).update({
      exercises: firebase.default.firestore.FieldValue.arrayUnion(workoutExercises)
    });
  }

  getWorkoutName(workoutId: string): Observable<string> {
    return this.firestore.collection('workouts').doc(workoutId).valueChanges().pipe(map((workout: any) => {
      if (workout) {
        return workout.name;
      } else {
        throw new Error('Workout not found');
      }
    })
    );
  }

  getAllWorkouts(): Observable<any> {
    return this.firestore.collection('workouts').valueChanges().pipe(map((workouts: any): void => {
      if (workouts) {
        return workouts;
      } else {
        throw new Error('Workouts not found');
      }
    }));
  }

  getWorkoutById(workoutId: string): Observable<WorkoutInterface> {
    return this.firestore.collection('workouts').doc(workoutId).valueChanges().pipe(map((workout: any) => {
      if (workout) {
        return workout;
      } else {
        throw new Error('Workouts not found');
      }
    }));
  }


}
