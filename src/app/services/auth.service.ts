import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import { from, Observable, throwError} from 'rxjs';
import {UserInterface} from '../interfaces/user.interface';
import {LoginInterface} from '../interfaces/login.interface';
import {NavController} from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private navControl: NavController
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

  login(user: LoginInterface): Observable<any> {
    if (!user) return throwError(() => new Error('Password is required'));
    return from(
      this.afAuth.signInWithEmailAndPassword(user.email, user.password).then((userCredential: any): void => {
        const userId: string | undefined = userCredential.user?.uid;
        if (userId) {
          this.getUserById(userId).subscribe({
            next: (user: UserInterface | null): void => {
              localStorage.setItem('user', JSON.stringify(
                {
                ...user,
                uid: userCredential.user?.uid,
                token: userCredential.user?.refreshToken
                }));
            },
            error: err => {
              console.error('Error getting user:', err);
            }
          })
        }
      }).catch(err => {
        console.error('Error in login firebase', err);
      })
    );
  }

  logout(): void {
    this.afAuth.signOut().then((): void => {
      void this.navControl.navigateBack('/login');
    }).catch((error): void => {
      console.error('Erro ao fazer logout:', error);
    });
  }

  getUserById(userId: string): Observable<UserInterface | null> {
    const userRef: AngularFirestoreDocument = this.firestore.collection('users').doc(userId);
    return new Observable((observer: any): void => {
      userRef.get().subscribe(
        {
          next: doc => {
            if (doc.exists) {
              const userData: UserInterface = doc.data() as UserInterface;
              observer.next(userData);
            } else {
              observer.error('Document not exist');
            }
          },
          error: err => {
            console.error('Error getting user:', err);
            observer.error(err);
          }
        }
      );
    });
  }

}
