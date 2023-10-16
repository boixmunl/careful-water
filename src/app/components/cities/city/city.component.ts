import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { City } from 'src/app/city';
import { CitiesService } from 'src/app/services/cities.service';
import { MapService } from 'src/app/services/map.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  @Input() city: any;
  @Output() deleteEmitter = new EventEmitter<number>();

  constructor(public citiesService: CitiesService, public mapService: MapService) {
    this.city = {
      id: undefined,
      title: undefined,
      content: undefined,
      lat: undefined,
      long: undefined,
      image_url: undefined,
      created_at: undefined,
      updated_at: undefined
    };
  }

  ngOnInit(): void {
  }

  save(): void {
    if (this.city) {
      this.citiesService.updateCity(this.city).subscribe();
    }
  }

  delete(city: City | null): void {
    this.deleteEmitter.emit(city?.id);
    this.citiesService.deleteCity(city?.id).subscribe();
    this.mapService.deleteMarker(city);
  }
}
