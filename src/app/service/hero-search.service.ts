import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map, Observable } from 'rxjs';

import { Hero } from '../data/hero';

@Injectable()
export class HeroSearchService {
  constructor(private http: Http) {}

  search(term: string): Observable<Hero[]> {
    return this.http.get(`app/heroes/?name=${term}`).pipe(
      map((data) => {
        return data.json().data as Hero[];
      })
    );
  }
}
