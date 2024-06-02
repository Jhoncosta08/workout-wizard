import { Component } from '@angular/core';
import {UserInterface} from '../../../interfaces/user.interface';
import {PhysicalAssessmentService} from '../../../services/physical-assessment.service';
import {AuthService} from '../../../services/auth.service';
import {SpinnerService} from '../../../services/spinner.service';
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


  constructor(
    private physicalService: PhysicalAssessmentService,
    private authService: AuthService,
    private spinner: SpinnerService,
    private navControl: NavController
  ) { this.spinner.hide() }


  ionViewWillEnter(): void {
    this.spinner.hide();
    this.authService.user.subscribe((user: UserInterface | null): void => {
      this.user = user;
    });
    this.getAllPhysicalAssessment();
  }


  getAllPhysicalAssessment(): void {
    if (this.user && this.user.uid) {
      this.spinner.show();
      this.physicalService.getAllUserPhysicalAssessment(this.user.uid).then((physicalAssessment : PhysicalInterface[]): void => {
        this.physicalAssessmentList = physicalAssessment;
        this.spinner.hide();
      }).catch(err => {
        this.spinner.hide();
        console.error('Error in getAllPhysicalAssessment', err);
      });
    }
  }

  moveToPhysicalAssessment(url: string): void {
    void this.navControl.navigateForward(url);
  }


  ionViewWillLeave(): void {
    this.spinner.hide();
  }


}
