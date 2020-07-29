import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlanetsService} from '../../services/planets.service';

@Component({
  selector: 'app-planet-details',
  templateUrl: './planet-details.component.html',
  styleUrls: ['./planet-details.component.scss']
})
export class PlanetDetailsComponent implements OnInit {
  planetName: string;
  planet = {
    rotationPeriod: '',
    orbitalPeriod: '',
    climate: ''
  };
  isLoading = false;

  constructor(private activatedRoute: ActivatedRoute,
              private planetsService: PlanetsService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.activatedRoute.queryParams.subscribe(params => {
      this.planetName = params['name'];

      this.planetsService.findPlanet(this.planetName).subscribe(data => {

        this.planet.climate = data.results[0].climate;
        this.planet.rotationPeriod = data.results[0].rotation_period;
        this.planet.orbitalPeriod = data.results[0].orbital_period;
        this.isLoading = false;

      });
    });
  }

  goToMainPage(){
    this.router.navigate(['/']);
  }

}
