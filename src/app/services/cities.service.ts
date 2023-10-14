import { Injectable } from '@angular/core';
import { City } from '../city';
import { Cities } from '../mock-cities';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { MapService, MarkerMap } from './map.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  endpointUrl = 'http://127.0.0.1:3000/api/v1/posts'

  constructor(public mapService: MapService, private http: HttpClient) { }

  getCities(): Observable<City[]> {
    const cities = this.http.get<City[]>(this.endpointUrl).pipe(tap(cities => {
      let initialMarkers: Array<MarkerMap> = [];
      cities.forEach(city => {
        let marker: MarkerMap = {position: {lat: city.lat, lng: city.long}, draggable: false};
        initialMarkers.push(marker)
      })
      this.mapService.setInitialMarkers(initialMarkers);
    }));
    
    return cities;
  }
}
