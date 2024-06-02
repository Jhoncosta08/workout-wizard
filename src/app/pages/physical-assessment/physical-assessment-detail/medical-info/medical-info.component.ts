import {Component, Input} from '@angular/core';
import {MedicalHistory} from '../../../../interfaces/physical.interface';

@Component({
  selector: 'app-medical-info',
  templateUrl: './medical-info.component.html',
  styleUrls: ['../physical-assessment-detail.page.scss'],
})
export class MedicalInfoComponent {
  @Input({required: true}) medicalInfo: MedicalHistory | null = null;
}
