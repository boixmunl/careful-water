import { Injectable } from '@angular/core';
import * as Leaflet from 'leaflet'; 

@Injectable({
  providedIn: 'root'
})
export class MapService {

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
  areMarkersSetted=false;

  public setInitialMarkers(markerArray: Array<MarkerMap>){
    this.markerArray=markerArray;
    this.areMarkersSetted=true;
    if(this.isMapReady){
      this.initMarkers();
    }
  }

  initMarkers() {
    for (let index = 0; index < this.markerArray.length; index++) {
      const data = this.markerArray[index];
      const marker = this.generateMarker(data, index);
      marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      this.map.panTo(data.position);
      this.markers.push(marker);
    }
  }

  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.isMapReady=true;
    if(this.areMarkersSetted){
      this.initMarkers();
    }
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  } 
}

export interface MarkerMap{
  position:
    {
      lat: number,
      lng: number
    },
  draggable: boolean
}