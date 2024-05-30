import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import firebase from 'firebase/compat';
import {AuthService} from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {}


  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(take(1), map((authState: firebase.User | null): boolean => {
        if (authState) {
          return true;
        } else {
          this.authService.logout();
          return false;
        }
      })
    );
  }


}
