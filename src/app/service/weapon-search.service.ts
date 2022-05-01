import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map, Observable } from 'rxjs';

import { Weapon } from '../data/weapon';

@Injectable()
export class WeaponSearchService {
  constructor(private http: Http) {}

  search(term: string): Observable<Weapon[]> {
    return this.http.get(`app/weapons/?name=${term}`).pipe(
      map((data) => {
        return data.json().data as Weapon[];
      })
    );
  }
}
