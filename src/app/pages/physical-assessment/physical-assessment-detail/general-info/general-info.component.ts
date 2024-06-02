import {Component, Input} from '@angular/core';
import {GeneralInfo} from '../../../../interfaces/physical.interface';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['../physical-assessment-detail.page.scss'],
})
export class GeneralInfoComponent {
  @Input({required: true}) generalInfo: GeneralInfo | null = null;
}
