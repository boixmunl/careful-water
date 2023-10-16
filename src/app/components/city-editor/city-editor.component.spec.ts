import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CityEditorComponent } from './city-editor.component';
import { of } from 'rxjs';
import { City } from 'src/app/city';
import { CitiesService } from 'src/app/services/cities.service';
import { MapService } from 'src/app/services/map.service';

describe('CityEditorComponent', () => {
  let component: CityEditorComponent;
  let fixture: ComponentFixture<CityEditorComponent>;
  let citiesService: CitiesService;
  let mapService: MapService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [ CityEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    citiesService = TestBed.inject(CitiesService);
    mapService = TestBed.inject(MapService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should add a city', () => {
    const newCity: City = {
      id: 1,
      title: 'Sample City',
      content: 'Sample content',
      lat: 0,
      long: 0,
      image_url: 'sample.jpg',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const cityTitle = 'Sample City';
    const cityContent = 'Sample content';
    const cityImageUrl = 'sample.jpg';
    const cityLat = 0;
    const cityLong = 0;

    spyOn(citiesService, 'addCity').and.returnValue(of(newCity));
    spyOn(citiesService.cities, 'push');
    spyOn(mapService, 'addMarker');

    component.add(cityTitle, cityContent, cityImageUrl, cityLat, cityLong);

    expect(citiesService.addCity).toHaveBeenCalledWith(jasmine.any(Object));
    expect(citiesService.cities.push).toHaveBeenCalledWith(newCity);
    expect(mapService.addMarker).toHaveBeenCalledWith(newCity);
  });

  it('should not add a city with an empty title', () => {
    spyOn(citiesService, 'addCity').and.stub();
    spyOn(citiesService.cities, 'push').and.stub();
    spyOn(mapService, 'addMarker').and.stub();

    component.add('', 'Sample content', 'sample.jpg', 0, 0);

    expect(citiesService.addCity).not.toHaveBeenCalled();
    expect(citiesService.cities.push).not.toHaveBeenCalled();
    expect(mapService.addMarker).not.toHaveBeenCalled();
  });
});
