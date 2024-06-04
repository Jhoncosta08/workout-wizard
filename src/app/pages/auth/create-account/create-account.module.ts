import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateAccountPageRoutingModule } from './create-account-routing.module';
import { CreateAccountPage } from './create-account.page';
import {PageSpinnerModule} from '../../../components/page-spinner/page-spinner.module';


@NgModule({
  declarations: [
    CreateAccountPage
  ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreateAccountPageRoutingModule,
        ReactiveFormsModule,
        PageSpinnerModule
    ],
})


export class CreateAccountPageModule {}
