import { Component } from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {UserInterface} from "../../interfaces/user.interface";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  public user!: UserInterface;

  constructor(
    private authService: AuthService,
    private menuControl: MenuController,
    private navControl: NavController
  ) {
    this.user = this.authService.user;
  }


  onLogout(): void {
    this.authService.logout();
  }

  closeMenu(): void {
    void this.menuControl.close();
  }

  goToProfile(): void {
    this.closeMenu();
    void this.navControl.navigateForward('/profile');
  }

}
