import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateExercisePageRoutingModule } from './create-exercise-routing.module';

import { CreateExercisePage } from './create-exercise.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreateExercisePageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [CreateExercisePage]
})
export class CreateExercisePageModule {}
