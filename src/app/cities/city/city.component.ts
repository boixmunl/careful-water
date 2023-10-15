import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { City } from 'src/app/city';
import { CitiesService } from 'src/app/services/cities.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  @Input() city: City | null;
  @Output() deleteEmitter = new EventEmitter<number>();

  constructor(public citiesService: CitiesService) { }

  ngOnInit(): void {
  }

  save(): void {
    if (this.city) {
      this.citiesService.updateCity(this.city).subscribe();
    }
  }

  delete(city: City | null): void {
    this.deleteEmitter.emit(city?.id);
    this.citiesService.deleteCity(city?.id).subscribe();
  }
}
