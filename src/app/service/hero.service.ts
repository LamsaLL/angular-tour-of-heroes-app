import { Injectable } from '@angular/core';
import { Hero } from '../data/hero';
import { HEROES } from '../data/mock-heroes';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    return heroes;
  }
  constructor() {}
}
