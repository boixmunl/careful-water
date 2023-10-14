import { Component, Input } from '@angular/core';
import { City } from '../city';
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

  add(title: string, content: string, image_url: string, lat: number, long: number): void {
    title = title.trim();
    if (!title) { return; }
    this.citiesService.addCity({id: this.cities[this.cities.length-1].id + 1, image_url, title, content,  lat, long, created_at: new Date(), updated_at: new Date()} as City)
      .subscribe(city => {
        this.cities.push(city);
      });
  }

  delete(id: number){
    this.cities = this.cities.filter(city => city.id !== id);
    this.selectedCity = undefined;
  }
}