import { Component } from '@angular/core';
import {NavController} from '@ionic/angular';
import {UserWorkoutService} from '../../services/user-workout.service';
import {UserWorkoutInterface} from '../../interfaces/user-workout.interface';
import {UserInterface} from '../../interfaces/user.interface';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  userWorkouts: UserWorkoutInterface[] = [];
  user: UserInterface | null = null;


  constructor(
    private navControl: NavController,
    private userWorkoutService: UserWorkoutService,
    private authService: AuthService
  ) { }


  moveRouteForward(url: string, params?: string): void {
    const route: string = params ? `${url}/${params}` : url;
    void this.navControl.navigateForward(route);
  }


  ionViewWillEnter(): void {
    this.userWorkouts = [];
    this.authService.user.subscribe((user: UserInterface | null): void => {
      this.user = user;
      if (this.user) {
        this.getAllWorkouts();
      }
    });
  }


  getAllWorkouts(): void {
    this.userWorkouts = [];
    if (this.user && this.user.uid) {
      this.userWorkoutService.getAllUserWorkout(this.user.uid).then((workouts: UserWorkoutInterface[]): void => {
        this.userWorkouts = workouts;
      }).catch(err => {
        this.userWorkouts = [];
        console.error('Error in getAllWorkouts: ', err);
      });
    }
  }


}
