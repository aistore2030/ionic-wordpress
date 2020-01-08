import { Injectable } from '@angular/core';
import { BASE_URL, TOKEN } from './constants/api';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class WeatherProvider {
  cities = [
    {
      'id': 294640,
      'name': 'State of Israel',
      'country': 'IL',
      'coord': {
        'lon': 34.75,
        'lat': 31.5
      }
    }
  ];
  constructor(public http: HttpClient) { }
  query(endpoint: string, params?: any): any {
    return this.get(endpoint, params);
  }

  get(endpoint: string, params?: any) {

    let paramsQuery = '?';
    // tslint:disable-next-line:forin
    for (const k in params) {
      paramsQuery += `&${k}=${params[k]}`;
    }

    paramsQuery += '&mode=json';
    paramsQuery += `&appid=${TOKEN}`;
    return this.http.get(BASE_URL + '/' + endpoint + paramsQuery);
  }

  search(query: string) {
    if (query.length > 2) {
      const filter = this.queryToFilter(query);
      return this.cities.filter(cityItem => {
        for (const key in filter) {
          if (cityItem[key] === undefined || !cityItem[key].includes(filter[key])) {
            return false;
          }
        }
        return true;
      });
    }
  }

  queryToFilter(query: string) {
    const [name, country] = query.split(',').map((item) => item.trim());
    const filter = { name, country };
    Object.keys(filter).forEach(key => filter[key] === undefined && delete filter[key]);
    return filter;
  }
}
