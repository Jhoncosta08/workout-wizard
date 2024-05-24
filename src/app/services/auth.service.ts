import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {UserInterface} from '../interfaces/user.interface';
import {LoginInterface} from '../interfaces/login.interface';
import {NavController} from '@ionic/angular';
import {ToastService} from './toast.service';
import {SpinnerService} from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: UserInterface;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private navControl: NavController,
    private toastService: ToastService,
    private spinnerControl: SpinnerService,
  ) {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  async register(user: UserInterface): Promise<void> {
    if (!user.password || user.password.trim().length === 0) {
      return this.toastService.presentErrorToast('User not found!');
    }
    try {
      this.spinnerControl.show();
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
      const userId: string | undefined = userCredential.user?.uid;
      if (userId) {
        const userData = {
          email: user.email,
          name: user.name,
          age: user.age,
          weight: user.weight,
          height: user.height,
          gender: user.gender,
          createdAt: new Date().toLocaleDateString('pt-br')
        };
        await this.firestore.collection('users').doc(userId).set(userData);
        await this.toastService.presentSuccessToast('Usuário criado com sucesso');
        await this.navControl.navigateForward('/home');
        this.spinnerControl.hide();
      }
    } catch (err) {
      this.spinnerControl.hide();
      void this.toastService.presentErrorToast('Error in create user');
      console.error('Error in create user', err);
    }
  }

  login(user: LoginInterface): void{
    if (!user) {
      void this.toastService.presentErrorToast('User not found!');
    } else {
      this.spinnerControl.show();
      this.afAuth.signInWithEmailAndPassword(user.email, user.password).then((userCredential: any): void => {
        const userId: string | undefined = userCredential.user?.uid;
        if (userId && userCredential) {
          this.getUserById(userId, userCredential);
        }
        this.toastService.presentSuccessToast('Login efetuado com sucesso').then((): void => {
          void this.navControl.navigateForward('/home');
          this.spinnerControl.hide();
        })
      }).catch(err => {
        console.error('Erro no login!:', err);
        void this.toastService.presentErrorToast('Erro no login!');
        this.spinnerControl.hide();
      });
    }
  }

  getUserById(userId: string, userCredential: any): void {
    const userRef: AngularFirestoreDocument = this.firestore.collection('users').doc(userId);
    userRef.get().subscribe({
      next: (userData: any) => {
        if (userData) {
          localStorage.setItem('user', JSON.stringify({
            ...userData.data(),
            uid: userCredential.user?.uid,
            token: userCredential.user?.refreshToken
          }));
        }
      },
      error: err => {
        console.error('Error getting user:', err);
      }
    });
  }

  logout(): void {
    this.afAuth.signOut().then((): void => {
      localStorage.clear();
      void this.navControl.navigateBack('/login');
    }).catch((error): void => {
      console.error('Erro ao fazer logout:', error);
    });
  }

}
