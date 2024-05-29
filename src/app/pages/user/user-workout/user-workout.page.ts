import { Component } from '@angular/core';
import {UserWorkoutService} from '../../../services/user-workout.service';
import {ActivatedRoute} from '@angular/router';
import {UserWorkoutInterface} from '../../../interfaces/user-workout.interface';
import {SpinnerService} from '../../../services/spinner.service';


@Component({
  selector: 'app-user-workout',
  templateUrl: './user-workout.page.html',
  styleUrls: ['./user-workout.page.scss'],
})
export class UserWorkoutPage {
  workoutId: string | null = null;
  userWorkout: UserWorkoutInterface | null = null;


  constructor(
    private userWorkoutService: UserWorkoutService,
    private route: ActivatedRoute,
    private spinnerService: SpinnerService
  ) { }


  ionViewWillEnter(): void {
    this.workoutId = this.route.snapshot.paramMap.get('id');
    this.getUserWorkoutDoc();
  }


  getUserWorkoutDoc(): void {
    if (this.workoutId) {
      this.spinnerService.show();
      this.userWorkoutService.getUserWorkoutById(this.workoutId).then((workout: UserWorkoutInterface): void => {
        this.userWorkout = workout;
        this.spinnerService.hide();
      }).catch(err => {
        console.error('Error in getUserWorkoutDoc: ', err);
        this.userWorkout = null;
        this.spinnerService.hide();
      });
    }
  }


}
