import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavComponent} from './nav.component';
import {NavItemsComponent} from './nav-items/nav-items.component';
import {IonicModule} from '@ionic/angular';


@NgModule({
  declarations: [NavComponent, NavItemsComponent],
  imports: [CommonModule, IonicModule],
  exports: [NavComponent, NavItemsComponent]
})
export class NavModule { }
