import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllWorkoutsListPageRoutingModule } from './all-workouts-list-routing.module';

import { AllWorkoutsListPage } from './all-workouts-list.page';
import {PageSpinnerModule} from '../../../components/page-spinner/page-spinner.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllWorkoutsListPageRoutingModule,
    PageSpinnerModule,
    NgOptimizedImage
  ],
  declarations: [AllWorkoutsListPage]
})
export class AllWorkoutsListPageModule {}
