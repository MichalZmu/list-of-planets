import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PlanetsComponent} from './modules/planets/planets.component';
import {PlanetDetailsComponent} from './modules/planet-details/planet-details.component';


const routes: Routes = [
  {
    path: '',
    component: PlanetsComponent
  },
  {
    path: 'detail',
    component: PlanetDetailsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
