import { Component } from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-nav-items',
  templateUrl: './nav-items.component.html',
  styleUrls: ['./nav-items.component.scss'],
})
export class NavItemsComponent {

  constructor(
    private navControl: NavController,
    private authService: AuthService,
    private menuController: MenuController
  ) { }


  logout(): void {
    this.menuController.close().then((): void => {
      this.authService.logout();
    });
  }

  moveUrlForward(url: string): void {
    void this.navControl.navigateForward(url);
  }

}
