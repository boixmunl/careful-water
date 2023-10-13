import { Component } from '@angular/core';
import { Cities } from './mock-cities';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Visited Cities in Spain';

  cities = Cities;
}
