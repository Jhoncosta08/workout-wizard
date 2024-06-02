import {Component, Input} from '@angular/core';
import {Anthropometry} from '../../../../interfaces/physical.interface';

@Component({
  selector: 'app-anthropometry-info',
  templateUrl: './anthropometry-info.component.html',
  styleUrls: ['../physical-assessment-detail.page.scss'],
})
export class AnthropometryInfoComponent {
  @Input({required: true}) anthropometryInfo: Anthropometry | null = null;
}
