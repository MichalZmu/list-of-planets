import {Injectable} from '@angular/core';
import {EMPTY, Observable} from 'rxjs';
import {expand, map, reduce} from 'rxjs/operators';
import {HttpClientService} from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class PlanetsService {
  private apiUrl = 'http://swapi.dev/api/planets/';

  constructor(private http: HttpClientService) {
  }

  getPlanetsTotal(): Observable<any> {
    return this.http.get({url: this.apiUrl, cacheMins: 10});
  }

  getPlanets(page: number, pageSize: number): Observable<any> {
    let i = 0;
    const pageTo = Math.ceil((pageSize * page) / 10);
    let pageFrom = Math.ceil(((pageSize * page) - pageSize) / 10 + 1);
    if (pageFrom <= 0) {
      pageFrom = 1;
    }
    const finalAPI = `${this.apiUrl}?page=${pageFrom}`;
    return this.http.get<Planet>({url: finalAPI, cacheMins: 10}).pipe(
      expand((response) => {
        i++;
        return response.next && (pageTo > i) ? this.getPage(response.next) : EMPTY;
      }),
      reduce((acc, data) => {
        if (acc && data) {
          return {
            results: acc.results.concat(data.results)
          };
        }
        return acc;
      }),
      map(data => {
        return data.results.splice((pageSize * page - pageSize) % 10, pageSize);
      })
    );
  }

  getPage(apiUrl: string): Observable<any> {
    return this.http.get<Planet>({url: apiUrl, cacheMins: 10}).pipe(map(response => {
      return {
        results: response.results,
        next: response.next
      };
    }));
  }

  findPlanet(planetName: string): Observable<any> {
    const finalAPI = `${this.apiUrl}?search=${planetName}`;
    return this.http.get<Planet>({url: finalAPI});
  }

}

interface Planet {
  next: string;
  results: [];
  count: number;
}
