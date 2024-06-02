import { Component } from '@angular/core';
import {UserInterface} from '../../../interfaces/user.interface';
import {PhysicalAssessmentService} from '../../../services/physical-assessment.service';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {PhysicalInterface} from '../../../interfaces/physical.interface';
import {ToastService} from '../../../services/toast.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-physical-assessment-detail',
  templateUrl: './physical-assessment-detail.page.html',
  styleUrls: ['./physical-assessment-detail.page.scss'],
})
export class PhysicalAssessmentDetailPage  {
  user: UserInterface | null = null;
  physicalId: string | null = null;
  physicalAssessment: PhysicalInterface | null = null;


  constructor(
    private physicalService: PhysicalAssessmentService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private navControl: NavController
  ) { }


  ionViewWillEnter(): void {
    this.physicalId = this.route.snapshot.paramMap.get('id');
    this.authService.user.subscribe((user: UserInterface | null): void => {
      this.user = user;
    });
    this.getPhysicalAssessmentDetail();
  }


  getPhysicalAssessmentDetail(): void {
    if (this.user && this.user.uid && this.physicalId) {
      this.physicalService.getUserPhysicalAssessmentById(this.user.uid, this.physicalId).then((physicalAssessment: PhysicalInterface | null): void => {
        this.physicalAssessment = physicalAssessment;
      }).catch(err => {
        console.error('Error in getPhysicalAssessmentDetail', err);
      })
    }
  }


  deletePhysicalAssessment(id: string): void {
    if (this.user && this.user.uid && id) {
      this.physicalService.deleteUserPhysicalAssessment(this.user.uid, id).then((): void => {
        this.toast.presentSuccessToast('Avaliação Excluida').then((): void => {})
        void this.navControl.navigateBack('/physical-assessment/physical-assessment-list');
      }).catch(err => {
        void this.toast.presentErrorToast('Ocorreu um erro');
        console.error('Error in deletePhysicalAssessment', err);
      });
    }
  }


}
