import {Component, Input, OnInit} from '@angular/core';
import {MenuController, NavController} from '@ionic/angular';
import {UserInterface} from '../../../interfaces/user.interface';

@Component({
  selector: 'app-nav-items',
  templateUrl: './nav-items.component.html',
  styleUrls: ['./nav-items.component.scss'],
})
export class NavItemsComponent implements OnInit {
  showAdminNav: boolean = false;
  @Input({required: true}) user!: UserInterface;

  constructor(
    private navControl: NavController,
    private menuControl: MenuController
  ) {}

  ngOnInit(): void {
    this.showAdminNav = this.user?.uid === 'ZyUFjKqr07fqmUUTw1WnQJAIbjW2';
  }

  moveUrlForward(url: string): void {
    this.menuControl.close().then((): void => {
      void this.navControl.navigateForward(url);
    });
  }

}
