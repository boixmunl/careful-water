import { Component, Input } from '@angular/core';
import { City } from '../city';
import { Cities } from '../mock-cities';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent {
  title = 'Visited Cities in Spain';

  cities = Cities;

  selectedCity?: City;

  onSelect(city: City): void {
    this.selectedCity = city;
  }
}