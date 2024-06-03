import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectTrainingPageRoutingModule } from './select-training-routing.module';

import { SelectTrainingPage } from './select-training.page';
import {ExerciseImgPipe} from '../../../pipes/exercise-img.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SelectTrainingPageRoutingModule,
        ExerciseImgPipe
    ],
  declarations: [SelectTrainingPage]
})
export class SelectTrainingPageModule {}
