import {CanActivate, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserGuard implements CanActivate {

  constructor(private authService: AuthService, private route: Router) {}

  canActivate(): boolean {
    if (this.authService.user) {
      void this.route.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
}
