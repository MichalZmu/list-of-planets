import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CacheService} from './cache.service';
import {Observable, of} from 'rxjs';
import {switchMap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private http: HttpClient,
    private cacheService: CacheService,
  ) {
  }

  get<T>(options: HttpOptions): Observable<T> {
    return this.httpCall('GET', options);
  }

  private httpCall<T>(verb: string, options: HttpOptions): Observable<T> {

    options.body = options.body || null;
    options.cacheMins = options.cacheMins || 0;

    if (options.cacheMins > 0) {
      const data = this.cacheService.load(options.url);
      if (data !== null) {
        return of<T>(data);
      }
    }
    return this.http.request<T>(verb, options.url, {
      body: options.body
    })
      .pipe(
        switchMap(response => {
          if (options.cacheMins > 0) {
            this.cacheService.save({
              key: options.url,
              data: response,
              expirationMins: options.cacheMins
            });
          }
          return of<T>(response);
        })
      );
  }
}

export class HttpOptions {
  url: string;
  body?: any;
  cacheMins?: number;
}
