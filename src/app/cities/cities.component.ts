import { Component, Input } from '@angular/core';
import { City } from '../city';
import { Cities } from '../mock-cities';
import { CitiesService } from '../services/cities.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent {
  title = 'Visited Cities in Spain';

  constructor(private citiesService:CitiesService){}

  cities: City[] = []

  selectedCity?: City;

  onSelect(city: City): void {
    this.selectedCity = city;
  }

  ngOnInit(): void {
    this.getCities();
  }

  getCities(): void {
    this.citiesService.getCities().subscribe(city => this.cities = city)
  }
}