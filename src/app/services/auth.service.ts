import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {UserInterface} from '../interfaces/user.interface';
import {LoginInterface} from '../interfaces/login.interface';
import {MenuController, NavController} from '@ionic/angular';
import {ToastService} from './toast.service';
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: BehaviorSubject<UserInterface | null> = new BehaviorSubject<UserInterface | null>(null);


  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    public navControl: NavController,
    private toastService: ToastService,
    private menuController: MenuController
  ) {
    this.user.next(JSON.parse(localStorage.getItem('user')!));
  }


  async register(user: UserInterface): Promise<void> {
    if (!user.password || user.password.trim().length === 0) return this.toastService.presentErrorToast('User not found!');
    try {
      this.user.next(null);
      localStorage.clear();
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
        this.setUserLocal(userId, userCredential);
        await this.navControl.navigateForward('/home');
      }
    } catch (err) {
      void this.toastService.presentErrorToast('Error in create user');
      console.error('Error in create user', err);
    }
  }


  login(user: LoginInterface): void{
    if (!user) {
      void this.toastService.presentErrorToast('User not found!');
    } else {
      this.user.next(null);
      localStorage.clear();
      this.afAuth.signInWithEmailAndPassword(user.email, user.password).then((userCredential: any): void => {
        const userId: string | undefined = userCredential.user?.uid;
        if (userId && userCredential) this.setUserLocal(userId, userCredential);
        this.toastService.presentSuccessToast('Login efetuado com sucesso').then((): void => {
          void this.navControl.navigateForward('/home');
        })
      }).catch(err => {
        console.error('Erro no login!:', err);
        void this.toastService.presentErrorToast('Erro no login!');
      });
    }
  }


  setUserLocal(userId: string, userCredential: any): void {
    const userRef: AngularFirestoreDocument = this.firestore.collection('users').doc(userId);
    userRef.get().subscribe({
      next: (userData: any): void => {
        if (userData) {
          localStorage.setItem('user', JSON.stringify({
            ...userData.data(),
            uid: userId ? userId : userCredential.user?.uid,
            token: userCredential.user?.refreshToken
          }));
          this.user.next(JSON.parse(localStorage.getItem('user')!));
        }
      },
      error: err => {
        console.error('Error in setUserLocal getting user:', err);
      }
    });
  }


  logout(): void {
    this.menuController.close().then((): void => {
      this.afAuth.signOut().then((): void => {
        localStorage.clear();
        this.user.next(null);
        void this.navControl.navigateForward('/welcome');
      });
    });
  }


  async redirectLoggedUser(): Promise<void> {
    const user: string | null = localStorage.getItem('user');
    if (user) {
      this.navControl.navigateRoot('/home').then((): void => {
       void Promise.resolve();
      });
    } else {
      void Promise.resolve();
    }
  }


}
