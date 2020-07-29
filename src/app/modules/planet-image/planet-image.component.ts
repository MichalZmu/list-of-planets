import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-planet-image',
  templateUrl: './planet-image.component.html',
  styleUrls: ['./planet-image.component.scss']
})
export class PlanetImageComponent implements OnInit {
  src: string;
  constructor() {}
  @Input() planetUrl: string;

  ngOnInit(): void {
    const arrayUrl = this.planetUrl.split('/');
    const id = arrayUrl.slice(-2, -1);
    this.src = String(Number(id) % 20);
  }

}
