import {Component} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {UserInterface} from '../../../interfaces/user.interface';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-nav-items',
  templateUrl: './nav-items.component.html',
  styleUrls: ['./nav-items.component.scss'],
})
export class NavItemsComponent {
  public userData: UserInterface | null = null;
  public showAdminNav: boolean = false;

  constructor(
    private navControl: NavController,
    private menuControl: MenuController,
    private authService: AuthService,
  ) {
    this.authService.user.subscribe((userData: UserInterface | null): void => {
      this.userData = userData;
      this.showAdminNav = this.userData?.uid === 'ZyUFjKqr07fqmUUTw1WnQJAIbjW2';
    });
  }

  moveUrlForward(url: string): void {
    this.menuControl.close().then((): void => {
      void this.navControl.navigateForward(url);
    });
  }

}
