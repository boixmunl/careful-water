import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CitiesService } from './cities.service';
import { City } from '../city';

describe('CitiesService', () => {
  let injector: TestBed;
  let citiesService: CitiesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    injector = getTestBed();
    citiesService = injector.inject(CitiesService);
    httpMock = injector.inject(HttpTestingController);

    citiesService.cities = [
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
    ]
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(citiesService).toBeTruthy();
  });

  it('should retrieve cities from the server', () => {
    const mockCities: City[] = [
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

    citiesService.getCities().subscribe((cities) => {
      expect(cities).toEqual(mockCities);
    });

    const req = httpMock.expectOne(citiesService.endpointUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCities);
  });

  it('should update a city', () => {
    const city: City = {
      id: 1,
      title: 'Updated City',
      content: 'Updated Content',
      lat: 0,
      long: 0,
      image_url: 'updated.jpg',
      created_at: new Date(),
      updated_at: new Date(),
    };

    citiesService.updateCity(city).subscribe((response) => {
      expect(response).toBeDefined();
    });

    const req = httpMock.expectOne(`${citiesService.endpointUrlId}${city.id}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should add a new city', () => {
    const newCity: City = {
      id: 3,
      title: 'New City',
      content: 'New Content',
      lat: 0,
      long: 0,
      image_url: 'new.jpg',
      created_at: new Date(),
      updated_at: new Date(),
    };

    citiesService.addCity(newCity).subscribe((response) => {
      expect(response).toEqual(newCity);
    });

    const req = httpMock.expectOne(citiesService.endpointUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newCity);
  });

  it('should delete a city', () => {
    const idToDelete = 1;

    citiesService.deleteCity(idToDelete).subscribe((response) => {
      expect(response).toBeDefined();
    });

    const req = httpMock.expectOne(`${citiesService.endpointUrlId}${idToDelete}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should retrieve a city by ID', () => {
    const idToRetrieve = 1;

    citiesService.getCityById(idToRetrieve);
    const city = citiesService.cities.find((x) => x.id === idToRetrieve);

    expect(city).toBeDefined();
    expect(city?.id).toEqual(idToRetrieve);
  });
});
