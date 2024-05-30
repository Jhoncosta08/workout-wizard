import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImcPageRoutingModule } from './imc-routing.module';

import { ImcPage } from './imc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImcPageRoutingModule
  ],
  declarations: [ImcPage]
})
export class ImcPageModule {}
