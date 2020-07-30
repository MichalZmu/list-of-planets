import { Component, OnInit } from '@angular/core';
import {PlanetsService} from '../../services/planets.service';
import {PageEvent} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit {
  planets = [];
  totalPlanets: number;
  planetsPerPage = 10;
  pageSizeOptions = [5, 10, 25, 100];
  isLoading = false;
  planetNameChanged: Subject<string> = new Subject<string>();


  constructor(private planetsService: PlanetsService,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.planetsService.getPlanets(1, this.planetsPerPage).pipe().subscribe(data => {
      this.planets = data;
      this.isLoading = false;
    });
    this.planetsService.getPlanetsTotal().subscribe(data => {
      this.totalPlanets = data.count;
    });
    this.planetNameChanged.pipe(
      debounceTime(300),
      distinctUntilChanged())
      .subscribe(name => {
        this.planetsService.findPlanet(name).subscribe(data => {
          this.planets = data.results;
          this.totalPlanets = data.count;
        });
      });
  }

  changePage(pageData: PageEvent): void {
    this.isLoading = true;
    this.planetsPerPage = pageData.pageSize;
    this.planetsService.getPlanets(pageData.pageIndex + 1, pageData.pageSize).subscribe(data => {
      this.planets = data;
      this.isLoading = false;
    });
  }

  search(planetName: string): void {
    this.planetNameChanged.next(planetName);
  }

  goToPlanetDetails(planetName: string): void {
    this.router.navigate(['detail'], {queryParams: {name: planetName}});
  }


}
