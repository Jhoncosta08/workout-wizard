import { Component } from '@angular/core';
import {NavController} from '@ionic/angular';
import {UserWorkoutService} from '../../services/user-workout.service';
import {UserWorkoutInterface} from '../../interfaces/user-workout.interface';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  userWorkouts: UserWorkoutInterface[] = [];


  constructor(
    private navControl: NavController,
    private userWorkoutService: UserWorkoutService,
  ) { }


  moveRouteForward(url: string, params?: string): void {
    const route: string = params ? `${url}/${params}` : url;
    void this.navControl.navigateForward(route);
  }


  ionViewWillEnter(): void {
    this.getAllWorkouts();
  }


  getAllWorkouts(): void {
    this.userWorkoutService.getAllUserWorkout().then((workouts: UserWorkoutInterface[]): void => {
      this.userWorkouts = workouts;
    }).catch(err => {
      this.userWorkouts = [];
      console.error('Error in getAllWorkouts: ', err);
    });
  }


}
