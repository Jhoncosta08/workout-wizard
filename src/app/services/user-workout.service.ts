import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {ExercisesInterface} from '../interfaces/exercises.interface';
import {UserWorkoutInterface} from '../interfaces/user-workout.interface';
import 'firebase/compat/firestore';
import {map} from 'rxjs/operators';
import {WorkoutInterface} from '../interfaces/workout.interface';
import * as firebase from 'firebase/compat/app';
import {AuthService} from './auth.service';
import {UserInterface} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserWorkoutService {
  userId: string = '';

  constructor(private firestore: AngularFirestore, private authService: AuthService) {
    this.authService.user.subscribe((user: UserInterface | null): void => {
      if (user && user.uid) this.userId = user.uid;
    });
  }

  async saveNewWorkout(workoutId: string, workoutName: string, exercises: ExercisesInterface[]): Promise<void> {
    const userWorkoutsCollection = this.firestore.collection('userWorkouts').doc(this.userId);
    const workoutsSubCollection = userWorkoutsCollection.collection('workouts');

    const userWorkout: UserWorkoutInterface = {
      userId: this.userId,
      workouts: [
        {
          id: workoutId,
          name: workoutName,
          exercises: exercises
        }
      ]
    } as UserWorkoutInterface;
    const docRef: any = await workoutsSubCollection.add(userWorkout);
    const id: string = docRef.id;
    const workoutData = { id: id };
    await docRef.update(workoutData);
  }

  addNewWorkoutGroup(newWorkout: WorkoutInterface, workoutDocId: string): Promise<void> {
    const userWorkoutDoc = this.firestore.collection('userWorkouts').doc(this.userId).collection('workouts').doc(workoutDocId);
    return userWorkoutDoc.update({
      workouts: firebase.default.firestore.FieldValue.arrayUnion(newWorkout)
    });
  }

  async updateExercises(workoutDocId: string, workoutId: string, updatedExercises: ExercisesInterface[]): Promise<void> {
    const userWorkoutDocRef = this.firestore.collection('userWorkouts').doc(this.userId).collection('workouts').doc(workoutDocId);
    try {
      const workoutDoc: any = await userWorkoutDocRef.get().toPromise();
      if (workoutDoc.exists) {
        const workouts = workoutDoc.data().workouts as WorkoutInterface[];
        const workoutIndex = workouts.findIndex(workout => workout.id === workoutId);
        if (workoutIndex !== -1) {
          const updatedWorkouts = [...workouts];
          updatedWorkouts[workoutIndex].exercises = updatedExercises;
          await userWorkoutDocRef.update({ workouts: updatedWorkouts });
          console.log('Exercises updated successfully!');
        } else {
          console.error('Workout not found!');
        }
      } else {
        console.error('Document not found!');
      }
    } catch (error) {
      console.error('Error updating exercises: ', error);
    }
  }

  async getAllUserWorkout(): Promise<any[]> {
    try {
      const querySnapshot: any = await this.firestore.collection('userWorkouts')
        .doc(this.userId)
        .collection('workouts')
        .get()
        .toPromise();

      const userWorkouts: any[] = [];
      querySnapshot.forEach((doc: any): void => {
        userWorkouts.push(doc.data());
      });

      if (userWorkouts.length > 0) {
        return userWorkouts;
      }
      return [];
    } catch (error) {
      throw new Error(`Error getting workouts`);
    }
  }

  async getUserWorkoutById(userWorkoutId: string): Promise<UserWorkoutInterface> {
    try {
      const doc: any = await this.firestore.collection('userWorkouts')
        .doc(this.userId)
        .collection('workouts')
        .doc(userWorkoutId)
        .get()
        .toPromise();

      return doc.data() as UserWorkoutInterface;
    } catch (error) {
      throw new Error(`Error getting workout`);
    }
  }

  async getUserWorkout(userWorkoutId: string, workoutId?: string): Promise<WorkoutInterface[]> {
    try {
      const doc: any = await this.firestore.collection('userWorkouts')
        .doc(this.userId)
        .collection('workouts')
        .doc(userWorkoutId)
        .get()
        .toPromise();

      if (doc.exists) {
        const userWorkout: any = doc.data();
        const workouts: WorkoutInterface[] = userWorkout.workouts;
        const filteredWorkout: WorkoutInterface[] = workouts.filter((workout: WorkoutInterface) => workout.id === workoutId);

        if (filteredWorkout.length > 0) {
          return filteredWorkout;
        }
      }
      return [];
    } catch (error) {
      throw new Error(`Error getting document`);
    }
  }

}
