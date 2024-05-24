import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import {ToastService} from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router, private toast: ToastService) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1),
      map(authState => {
        if (authState) {
          return true;
        } else {
          this.router.navigate(['/login']).then((): void => {
            void this.toast.presentErrorToast('Usuário não logado!');
          })
          return false;
        }
      })
    );
  }
}
