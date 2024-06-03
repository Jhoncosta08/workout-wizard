import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StartTrainingPageRoutingModule } from './start-training-routing.module';

import { StartTrainingPage } from './start-training.page';
import {ExerciseImgPipe} from '../../../pipes/exercise-img.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        StartTrainingPageRoutingModule,
        ExerciseImgPipe
    ],
  declarations: [StartTrainingPage]
})
export class StartTrainingPageModule {}
