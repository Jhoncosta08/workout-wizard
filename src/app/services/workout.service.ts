import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {ExercisesInterface} from '../interfaces/exercises.interface';
import * as firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor(private firestore: AngularFirestore) { }

  createWorkout(workoutName: string): Promise<any> {
    return this.firestore.collection('workouts').add({data: workoutName});
  }

  addWorkoutExercises(workoutId: string, workoutExercises: ExercisesInterface[]): Promise<void> {
    return this.firestore.collection('workouts').doc(workoutId).update({
      exercises: firebase.default.firestore.FieldValue.arrayUnion(workoutExercises)
    });
  }

  getWorkoutName(workoutId: string): Observable<string> {
    return this.firestore.collection('workouts').doc(workoutId).valueChanges().pipe(map((workout: any) => {
      if (workout) {
        return workout.data;
      } else {
        throw new Error('Workout not found');
      }
    })
    );
  }


}
