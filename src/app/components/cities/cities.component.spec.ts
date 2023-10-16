import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CitiesComponent } from './cities.component';
import { CitiesService } from 'src/app/services/cities.service';
import { MapService } from 'src/app/services/map.service';
import { of } from 'rxjs';
import { City } from 'src/app/city';

describe('CitiesComponent', () => {
  let component: CitiesComponent;
  let fixture: ComponentFixture<CitiesComponent>;
  let citiesService: CitiesService;
  let mapService: MapService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [ CitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    citiesService = TestBed.inject(CitiesService);
    mapService = TestBed.inject(MapService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCities() on ngOnInit', () => {
    spyOn(citiesService, 'getCities').and.returnValue(of([]));
    component.ngOnInit();
    expect(citiesService.getCities).toHaveBeenCalled();
  });

  it('should select a city', () => {
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

    spyOn(mapService, 'onSelect');
    spyOn(mapService, 'openPopup');
    
    component.onSelect(city);

    expect(mapService.onSelect).toHaveBeenCalledWith(city);
    expect(mapService.openPopup).toHaveBeenCalledWith(city);
  });

  it('should delete a city', () => {
    const idToDelete = 1;
    const cityList: City[] = [
      {
        id: 1,
        title: 'City 1',
        content: 'Content 1',
        lat: 0,
        long: 0,
        image_url: 'image1.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        title: 'City 2',
        content: 'Content 2',
        lat: 0,
        long: 0,
        image_url: 'image2.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    spyOn(citiesService, 'getCities').and.returnValue(of(cityList));

    component.ngOnInit();
    expect(citiesService.getCities).toHaveBeenCalled();
    expect(citiesService.cities.length).toBe(2);

    spyOn(mapService, 'deselectCity');
    
    component.delete(idToDelete);

    expect(citiesService.cities.length).toBe(1);
    expect(citiesService.cities[0].id).toBe(2);
    expect(mapService.deselectCity).toHaveBeenCalled();
  });
});
