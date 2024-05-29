import { Component } from '@angular/core';
import {UserWorkoutService} from '../../../services/user-workout.service';
import {ActivatedRoute} from '@angular/router';
import {UserWorkoutInterface} from '../../../interfaces/user-workout.interface';

@Component({
  selector: 'app-user-workout',
  templateUrl: './user-workout.page.html',
  styleUrls: ['./user-workout.page.scss'],
})
export class UserWorkoutPage {
  workoutId: string | null = null;
  userWorkout!: UserWorkoutInterface;

  constructor(
    private userWorkoutService: UserWorkoutService,
    private route: ActivatedRoute
  ) { }

  ionViewWillEnter(): void {
    this.workoutId = this.route.snapshot.paramMap.get('id');
    this.getUserWorkoutDoc();
  }

  getUserWorkoutDoc(): void {
    if (this.workoutId) {
      this.userWorkoutService.getUserWorkoutById(this.workoutId).then((workout: UserWorkoutInterface): void => {
        this.userWorkout = workout;
        console.log('userWorkout', this.userWorkout);
      }).catch(err => {
        console.error('Error: ', err);
      });
    }
  }

}
