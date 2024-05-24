import { Component } from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {

  constructor(
    private nav: NavController,
    private authService: AuthService
  ) { }

  ionViewWillEnter(): void {
    this.authService.redirectLoggedUser();
  }

  moveRouteForward(routeUrl: string): void {
    void this.nav.navigateForward(routeUrl);
  }

}
