import { TestBed, getTestBed } from '@angular/core/testing';
import { MapService, MarkerMap } from './map.service';
import * as L from 'leaflet';

describe('MapService', () => {
  let injector: TestBed;
  let mapService: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapService],
    });

    injector = getTestBed();
    mapService = injector.inject(MapService);
  });

  it('should be created', () => {
    expect(mapService).toBeTruthy();
  });

  it('should initialize markers and fit bounds when map is ready', () => {
    const markerArray: MarkerMap[] = [
      {
        city: {
          id: 1,
          title: 'City 1',
          content: 'Content 1',
          lat: 0,
          long: 0,
          image_url: 'image1.jpg',
          created_at: new Date(),
          updated_at: new Date(),
        },
        position: { lat: 28.626137, lng: 79.821603 },
        draggable: false,
      },
    ];

    spyOn(mapService, 'initMarkers');
    spyOn(mapService, 'showAllMarkers');

    mapService.onMapReady(L.map(document.createElement('div')));

    mapService.setInitialMarkers(markerArray);

    expect(mapService.isMapReady).toBeTrue();
    expect(mapService.areMarkersSetted).toBeTrue();
    expect(mapService.initMarkers).toHaveBeenCalled();
  });
});
