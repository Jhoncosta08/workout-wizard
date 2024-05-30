import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {UserInterface} from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }


  async updateUser(userInfo: UserInterface): Promise<void> {
    try {
      const user: any = await this.afAuth.currentUser;
      if (user) {
        await user.updateEmail(userInfo.email);
        const userDocRef: AngularFirestoreDocument = this.firestore.collection('users').doc(userInfo.uid);
        return await userDocRef.update(userInfo);
      }
    } catch (error) {
      console.log("Error in update user:", error);
      throw error;
    }
  }


}
