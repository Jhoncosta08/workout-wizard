import { Component } from '@angular/core';
import {UserInterface} from '../../../interfaces/user.interface';
import {PhysicalAssessmentService} from '../../../services/physical-assessment.service';
import {AuthService} from '../../../services/auth.service';
import {PhysicalInterface} from '../../../interfaces/physical.interface';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-physical-assessment-list',
  templateUrl: './physical-assessment-list.page.html',
  styleUrls: ['./physical-assessment-list.page.scss'],
})
export class PhysicalAssessmentListPage{
  user: UserInterface | null = null;
  physicalAssessmentList: PhysicalInterface[] = [];
  showSpinner: boolean = true;


  constructor(
    private physicalService: PhysicalAssessmentService,
    private authService: AuthService,
    private navControl: NavController
  ) {}


  ionViewWillEnter(): void {
    this.showSpinner = true;
    this.authService.user.subscribe((user: UserInterface | null): void => {
      this.user = user;
    });
    this.getAllPhysicalAssessment();
  }


  getAllPhysicalAssessment(): void {
    if (this.user && this.user.uid) {
      this.physicalService.getAllUserPhysicalAssessment(this.user.uid).then((physicalAssessment : PhysicalInterface[]): void => {
        this.physicalAssessmentList = physicalAssessment;
        this.showSpinner = false;
      }).catch(err => {
        this.showSpinner = false;
        console.error('Error in getAllPhysicalAssessment', err);
      });
    } else {
      this.showSpinner = false;
    }
  }

  moveRouteForward(routeUrl: string, param?: string): void {
    const url: string = param ? `${routeUrl}/${param}` : routeUrl
    void this.navControl.navigateForward(url);
  }


  ionViewWillLeave(): void {
    this.showSpinner = false;
  }


}
