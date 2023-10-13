import { Component, Input, OnInit } from '@angular/core';
import { City } from 'src/app/city';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss']
})
export class CityComponent implements OnInit {
  @Input() city: City;

  constructor() { }

  ngOnInit(): void {
  }

}
