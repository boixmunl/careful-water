import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../services/cities.service';
import { City } from '../city';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-city-editor',
  templateUrl: './city-editor.component.html',
  styleUrls: ['./city-editor.component.scss']
})
export class CityEditorComponent implements OnInit {

  public title = 'Add City'

  constructor(private citiesService: CitiesService, private mapService: MapService) { }

  ngOnInit(): void {
  }

  add(title: string, content: string, image_url: string, lat: number, long: number): void {
    title = title.trim();
    if (!title) { return; }
    const city: City = { id: this.citiesService.cities[this.citiesService.cities.length - 1].id + 1, image_url, title, content, lat, long, created_at: new Date(), updated_at: new Date() };
    this.citiesService.addCity(city)
      .subscribe(city => {
        this.citiesService.cities.push(city);
        this.mapService.addMarker(city);
      });
  }
}
