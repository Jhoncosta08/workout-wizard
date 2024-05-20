import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {from, Observable, throwError} from 'rxjs';
import {UserInterface} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  register(user: UserInterface): Observable<void> {
    if (!user.password || user.password.trim().length === 0) {
      return throwError(() => new Error('Password is required'));
    }
    return from (
      this.afAuth.createUserWithEmailAndPassword(user.email, user.password).then(userCredential => {
        const userId = userCredential.user?.uid;
        if (userId) {
          return this.firestore.collection('users').doc(userId).set({
            email: user.email,
            name: user.name,
            age: user.age,
            weight: user.weight,
            height: user.height,
            gender: user.gender,
            createdAt: new Date()
          });
        } else {
          throw new Error('User ID not available');
        }
      }).catch(err => {
        console.error('Error in create user in firebase', err);
      })
    );
  }

}
