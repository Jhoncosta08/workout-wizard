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
  showSpinner: boolean = true;


  constructor(
    private navControl: NavController,
    private userWorkoutService: UserWorkoutService,
    private authService: AuthService
  ) { }


  moveRouteForward(url: string, params?: string): void {
    const route: string = params ? `${url}/${params}` : url;
    this.navControl.navigateForward(route).then((): void => {
      this.showSpinner = false;
    });
  }


  ionViewWillEnter(): void {
    this.showSpinner = true;
    this.userWorkouts = [];
    this.authService.user.subscribe((user: UserInterface | null): void => {
      this.user = user;
      if (this.user) {
        this.getAllWorkouts();
      } else {
        this.showSpinner = false;
      }
    });
  }


  getAllWorkouts(): void {
    this.userWorkouts = [];
    if (this.user && this.user.uid) {
      this.userWorkoutService.getAllUserWorkout(this.user.uid).then((workouts: UserWorkoutInterface[]): void => {
        this.userWorkouts = workouts;
        this.showSpinner = false;
      }).catch(err => {
        this.userWorkouts = [];
        this.showSpinner = false;
        console.error('Error in getAllWorkouts: ', err);
      });
    }
  }


  ionViewWillLeave(): void {
    this.showSpinner = false;
  }


}
