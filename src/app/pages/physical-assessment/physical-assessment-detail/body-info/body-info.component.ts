import {Component, Input} from '@angular/core';
import {BodyComposition} from '../../../../interfaces/physical.interface';

@Component({
  selector: 'app-body-info',
  templateUrl: './body-info.component.html',
  styleUrls: ['../physical-assessment-detail.page.scss'],
})
export class BodyInfoComponent {
  @Input({required: true}) bodyInfo: BodyComposition | null = null;
}
