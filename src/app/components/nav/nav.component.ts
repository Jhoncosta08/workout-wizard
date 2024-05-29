import {Component, OnInit} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {AuthService} from '../../services/auth.service';
import {UserInterface} from '../../interfaces/user.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  public user: UserInterface | null = null;
  public profileImg: string = 'https://ionicframework.com/docs/img/demos/avatar.svg'


  constructor(
    private authService: AuthService,
    private menuControl: MenuController,
    private navControl: NavController
  ) {}


  ngOnInit():void  {
    this.authService.user.subscribe((userData: UserInterface | null): void => {
      this.user = userData;
      if ( this.user && this.user?.profilePicture) this.profileImg = this.user?.profilePicture;
    });
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
