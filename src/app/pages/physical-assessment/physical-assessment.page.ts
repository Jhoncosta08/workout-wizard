import {Component} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BodyComposition, PhysicalInterface} from '../../interfaces/physical.interface';
import {UserInterface} from '../../interfaces/user.interface';
import {PhysicalAssessmentService} from '../../services/physical-assessment.service';
import {AuthService} from '../../services/auth.service';
import {ToastService} from '../../services/toast.service';
import {NavController} from '@ionic/angular';


@Component({
  selector: 'app-physical-assessment',
  templateUrl: './physical-assessment.page.html',
  styleUrls: ['./physical-assessment.page.scss'],
})
export class PhysicalAssessmentPage {
  physicalAssessmentForm: FormGroup;
  user: UserInterface | null = null;
  showSpinner: boolean = false;


  constructor(
    private fb: FormBuilder,
    private physicalService: PhysicalAssessmentService,
    private authService: AuthService,
    private toast: ToastService,
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
      this.showSpinner = true;
      const formData: PhysicalInterface = this.physicalAssessmentForm.value;
      if (this.user && this.user.uid) {
        void this.calcFat(formData);
        this.physicalService.saveNewUserPhysicalAssessment(this.user.uid, formData).then((): void => {
          this.saveOrUpdateSuccessHandle('Salva');
          this.showSpinner = false;
        }).catch(err => {
          this.showSpinner = false;
          this.errorHandle(err, 'Error in saveNewUserPhysicalAssessment');
        });
      } else {
        this.showSpinner = false;
      }
    }
  }


  async calcFat(formData: PhysicalInterface): Promise<void> {
    if (this.user && this.user.age) {
      const body: BodyComposition = formData.bodyComposition;
      const sumOfSkinFolds: number = body?.biceps + body?.triceps + body?.subscapular + body?.suprailiac;
      const age: number = this.user.age;
      const bodyDensity: number = 1.097 - (0.00046971 * sumOfSkinFolds) + (0.00000056 * Math.pow(sumOfSkinFolds, 2)) - (0.00012828 * age);
      const bodyFatPercentage: number = ((4.95 / bodyDensity) - 4.5) * 100;
      const weight: number = formData.generalInfo?.weight;
      const fatMassKg: number = (bodyFatPercentage / 100) * weight;
      formData.bodyComposition.fat = bodyFatPercentage;
      formData.bodyComposition.fatMass = fatMassKg;
      formData.bodyComposition.leanMass = weight - fatMassKg;
    }
  }


  saveOrUpdateSuccessHandle(handleMessage: 'Salva' | 'Atualizada'): void {
    this.toast.presentSuccessToast(`Avaliação ${handleMessage}`).then((): void => {
      void this.navControl.navigateForward('/physical-assessment/physical-assessment-list');
    });
  }


  errorHandle(err: any, errorMessage: string): void {
    console.error(errorMessage, err);
    void this.toast.presentErrorToast('Ocorreu um erro!');
  }


}
