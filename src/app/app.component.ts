import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  handleRefresh(event: any): void {
    setTimeout((): void => {
      window.location.reload();
      event.target.complete();
    }, 1000);
  }

  showNavMenu(): boolean {
    const excludedRoutes: string[] = ['/login', '/welcome', '/create-account'];
    return !excludedRoutes.some((route: string) => this.router.url.includes(route));
  }

}
