import { Component } from '@angular/core';
import {NavController} from '@ionic/angular';
import {AuthService} from '../../../services/auth.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {
  showSpinner: boolean = true;


  constructor(
    private nav: NavController,
    private authService: AuthService
  ) { }


  ionViewWillEnter(): void {
    this.showSpinner = true;
    this.authService.redirectLoggedUser().then((): void => {
      setTimeout(() => this.showSpinner = false, 1000);
    }).catch((): void => {
      setTimeout(() => this.showSpinner = false, 1000);
    });
  }


  moveRouteForward(routeUrl: string): void {
    void this.nav.navigateForward(routeUrl);
  }


}
