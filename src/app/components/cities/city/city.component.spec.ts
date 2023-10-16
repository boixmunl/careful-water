import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CityComponent } from './city.component';
import { CitiesService } from 'src/app/services/cities.service';
import { MapService } from 'src/app/services/map.service';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { City } from 'src/app/city';

describe('CityComponent', () => {
  let component: CityComponent;
  let fixture: ComponentFixture<CityComponent>;
  let citiesService: CitiesService;
  let mapService: MapService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [ CityComponent ],
      providers: [CitiesService, MapService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    citiesService = TestBed.inject(CitiesService);
    mapService = TestBed.inject(MapService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call delete() method and emit an event', () => {
    const city: City = {
      id: 1,
      title: 'Sample City',
      content: 'Sample content',
      lat: 0,
      long: 0,
      image_url: 'sample.jpg',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const deleteEmitter = new EventEmitter<number>();
    spyOn(deleteEmitter, 'emit');

    spyOn(citiesService, 'deleteCity').and.returnValue(of(null));
    spyOn(mapService, 'deleteMarker');

    component.deleteEmitter = deleteEmitter;
    component.delete(city);

    expect(citiesService.deleteCity).toHaveBeenCalledWith(city.id);
    expect(mapService.deleteMarker).toHaveBeenCalledWith(city);
    expect(deleteEmitter.emit).toHaveBeenCalledWith(city.id);
  });
});
