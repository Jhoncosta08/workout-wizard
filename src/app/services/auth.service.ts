import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {from, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  register(email: string, password: string): Observable<void> {
    return from (
      this.afAuth.createUserWithEmailAndPassword(email, password).then(userCredential => {
        const userId = userCredential.user?.uid;
        if (userId) {
          return this.firestore.collection('users').doc(userId).set({
            email: email,
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
