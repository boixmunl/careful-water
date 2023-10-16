import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { City } from '../../city';
import { CitiesService } from '../../services/cities.service';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent {
  title = 'Visited Cities';
  selectedCity: City | null

  constructor(public citiesService: CitiesService, public mapService: MapService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getCities();
    this.mapService.selectedCity.subscribe(city => {
      this.selectedCity = city
      this.changeDetectorRef.detectChanges();
    });
  }

  getCities(): void {
    this.citiesService.getCities().subscribe(cities => this.citiesService.setCities(cities))
  }

  onSelect(city: City) {
    this.mapService.onSelect(city);
    this.mapService.openPopup(city);
  }

  delete(id: number) {
    this.citiesService.cities = this.citiesService.cities.filter(city => city.id !== id);
    this.mapService.deselectCity();
  }
}