import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExerciseDetailPageRoutingModule } from './exercise-detail-routing.module';
import { ExerciseDetailPage } from './exercise-detail.page';


@NgModule({
  declarations: [
    ExerciseDetailPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExerciseDetailPageRoutingModule
  ],
})


export class ExerciseDetailPageModule {}
