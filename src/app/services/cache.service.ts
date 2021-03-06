import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  constructor() {
  }

  save(options: LocalStorageSaveOptions) {
    options.expirationMins = options.expirationMins || 0;

    const expirationMS = options.expirationMins !== 0 ? options.expirationMins * 60 * 1000 : 0;

    const record = {
      value: typeof options.data === 'string' ? options.data : JSON.stringify(options.data),
      expiration: expirationMS !== 0 ? new Date().getTime() + expirationMS : null,
      hasExpiration: expirationMS !== 0 ? true : false
    };
    localStorage.setItem(options.key, JSON.stringify(record));
  }

  load(key: string) {
    const item = localStorage.getItem(key);
    if (item !== null) {
      const record = JSON.parse(item);
      const now = new Date().getTime();
      if (!record || (record.hasExpiration && record.expiration <= now)) {
        return null;
      } else {
        return JSON.parse(record.value);
      }
    }
    return null;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  cleanLocalStorage() {
    localStorage.clear();
  }
}

export class LocalStorageSaveOptions {
  key: string;
  data: any;
  expirationMins?: number;
}
