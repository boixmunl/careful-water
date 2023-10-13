import { Component, Input } from '@angular/core';
import { City } from '../city';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent {
  @Input() city: City;
}