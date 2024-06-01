import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PhysicalInterface} from '../../interfaces/physical.interface';
import {UserInterface} from '../../interfaces/user.interface';
import {PhysicalAssessmentService} from '../../services/physical-assessment.service';
import {AuthService} from '../../services/auth.service';
import {ToastService} from '../../services/toast.service';
import {SpinnerService} from '../../services/spinner.service';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-physical-assessment',
  templateUrl: './physical-assessment.page.html',
  styleUrls: ['./physical-assessment.page.scss'],
})
export class PhysicalAssessmentPage {
  physicalAssessmentForm: FormGroup;
  user: UserInterface | null = null;


  constructor(
    private fb: FormBuilder,
    private physicalService: PhysicalAssessmentService,
    private authService: AuthService,
    private toast: ToastService,
    private spinner: SpinnerService,
    private navControl: NavController
  ) {
    this.physicalAssessmentForm = this.fb.group({});
  }


  ionViewWillEnter(): void {
    this.authService.user.subscribe((user: UserInterface | null): void => {
      this.user = user;
    });
  }


  onSavePhysycalForm(): void {
    if (this.physicalAssessmentForm.valid) {
      this.spinner.show();
      const formData: PhysicalInterface = this.physicalAssessmentForm.value;
      if (this.user && this.user.uid) {
        this.physicalService.saveNewUserPhysicalAssessment(this.user.uid, formData).then((): void => {
          this.spinner.hide();
          this.toast.presentSuccessToast('Avaliação salva').then((): void => {
            void this.navControl.navigateForward('/physical-assessment/physical-assessment-list');
          });
        }).catch(err => {
          this.spinner.hide();
          console.error('Error in onSavePhysycalForm', err);
          void this.toast.presentErrorToast('Ocorreu um erro!');
        });
      }
    }
  }


  ionViewWillLeave(): void {
    this.spinner.hide();
  }

}
