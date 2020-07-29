import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { PlanetsComponent } from './modules/planets/planets.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PlanetImageComponent } from './modules/planet-image/planet-image.component';
import { PlanetDetailsComponent } from './modules/planet-details/planet-details.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButton, MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PlanetsComponent,
    PlanetImageComponent,
    PlanetDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
