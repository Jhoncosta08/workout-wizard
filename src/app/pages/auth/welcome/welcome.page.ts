import { Component } from '@angular/core';
import {NavController} from "@ionic/angular";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {

  constructor(private nav: NavController) { }

  moveRouteForward(routeUrl: string): void {
    void this.nav.navigateForward(routeUrl);
  }

}
