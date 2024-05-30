import {Component, Input} from '@angular/core';
import {WorkoutInterface} from '../../interfaces/workout.interface';


@Component({
  selector: 'app-workout-icon-group',
  templateUrl: './workout-icon-group.component.html',
  styleUrls: ['./workout-icon-group.component.scss'],
})
export class WorkoutIconGroupComponent {
  @Input({required: true}) workout!: WorkoutInterface;
}
