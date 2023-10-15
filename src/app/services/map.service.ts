import { Injectable } from '@angular/core';
import * as Leaflet from 'leaflet';
import { City } from '../city';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  selectedCity = new Subject<City | null>();

  constructor() { }

  map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 16,
    center: { lat: 28.626137, lng: 79.821603 }
  }
  markerArray: Array<MarkerMap>;
  isMapReady = false;
  areMarkersSetted = false;

  public setInitialMarkers(markerArray: Array<MarkerMap>) {
    this.markerArray = markerArray;
    this.areMarkersSetted = true;
    if (this.isMapReady) {
      this.initMarkers();
    }
  }

  initMarkers() {
    for (let index = 0; index < this.markerArray.length; index++) {
      const data = this.markerArray[index];
      const marker = this.generateMarker(data);
      marker.addTo(this.map).bindPopup(`<b>${data.city.title}:</b> ${data.position.lat},  ${data.position.lng}`);
      this.map.panTo(data.position);
      this.markers.push(marker);
    }
    this.showAllMarkers();
  }

  generateMarker(data: any) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', () => this.onSelect(data.city));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.isMapReady = true;
    if (this.areMarkersSetted) {
      this.initMarkers();
    }
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  showAllMarkers() {
    let group = Leaflet.featureGroup(this.markers);
    this.map.fitBounds(group.getBounds());
  }

  onSelect(city: City): void {
    this.selectedCity.next(city);
  }

  deselectCity() {
    this.selectedCity.next(null);
  }

  openPopup(city: City) {
    this.markers[city.id - 1].openPopup()
  }
}

export interface MarkerMap {
  city: City,
  position:
  {
    lat: number,
    lng: number
  },
  draggable: boolean
}