import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {UserInterface} from '../interfaces/user.interface';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }


  async updateUser(userInfo: UserInterface): Promise<void> {
    try {
      const user: any = await this.afAuth.currentUser;
      if (user) {
        const userDocRef: AngularFirestoreDocument = this.firestore.collection('users').doc(user.uid);
        await userDocRef.update(userInfo);
        this.authService.setUserLocal(user.uid, user);
        return Promise.resolve();
      }
    } catch (error) {
      console.error("Error in update user:", error);
      throw error;
    }
  }


}
