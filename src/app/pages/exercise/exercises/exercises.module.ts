import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExercisesPageRoutingModule } from './exercises-routing.module';
import { ExercisesPage } from './exercises.page';


@NgModule({
  declarations: [
    ExercisesPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExercisesPageRoutingModule
  ],
})


export class ExercisesPageModule {}
