import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WelcomePageRoutingModule } from './welcome-routing.module';
import { WelcomePage } from './welcome.page';
import {PageSpinnerModule} from '../../../components/page-spinner/page-spinner.module';


@NgModule({
  declarations: [
    WelcomePage
  ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        WelcomePageRoutingModule,
        PageSpinnerModule
    ],
})


export class WelcomePageModule {}
