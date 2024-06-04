import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
import {PageSpinnerModule} from '../../../components/page-spinner/page-spinner.module';


@NgModule({
  declarations: [
    LoginPage
  ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LoginPageRoutingModule,
        ReactiveFormsModule,
        PageSpinnerModule
    ],
})


export class LoginPageModule {}
