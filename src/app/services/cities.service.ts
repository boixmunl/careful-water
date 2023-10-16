import { Injectable } from '@angular/core';
import { City } from '../city';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MapService, MarkerMap } from './map.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  cities: City[] = []

  endpointUrl = 'http://127.0.0.1:3000/api/v1/posts'
  endpointUrlId = 'http://127.0.0.1:3000/api/v1/posts/'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(public mapService: MapService, private http: HttpClient) { }

  getCities(): Observable<City[]> {
    const cities = this.http.get<City[]>(this.endpointUrl).pipe(tap(cities => {
      let initialMarkers: Array<MarkerMap> = [];
      cities.forEach(city => {
        let marker: MarkerMap = { city, position: { lat: city.lat, lng: city.long }, draggable: false };
        initialMarkers.push(marker)
      })
      this.mapService.setInitialMarkers(initialMarkers);
    }));

    return cities;
  }

  setCities(cities: City[]) {
    this.cities = cities;
  }

  updateCity(city: City): Observable<any> {
    return this.http.put(this.endpointUrlId + city.id, city, this.httpOptions).pipe(
      tap(_ => console.log(`updated city id=${city.id}`)));
  }

  getCity(id: number): Observable<City> {
    return this.http.get<City>(this.endpointUrlId + id);
  }

  addCity(city: City): Observable<City> {
    return this.http.post<City>(this.endpointUrl, city, this.httpOptions).pipe(
      tap((newCity: City) => console.log(`added city w/ id=${newCity.id}`))
    );
  }

  deleteCity(id: number | undefined): Observable<City | null> {
    const url = `${this.endpointUrl}/${id}`;

    return this.http.delete<City>(this.endpointUrlId + id, this.httpOptions).pipe(
      tap(_ => console.log(`deleted city id=${id}`)));
  }

  getCityById(id: number) {
    return this.cities.find(x => x.id === id);
  }
}
