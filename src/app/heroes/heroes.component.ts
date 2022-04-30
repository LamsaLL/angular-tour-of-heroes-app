import { Component, OnInit, Pipe } from '@angular/core';
import { first } from 'rxjs';

import { Hero } from '../data/hero';
import { HeroService } from '../service/hero.service';
import { MessageService } from '../service/message.service';
@Pipe({
  name: 'filterHeros',
})
export class FilterHeroPipe {
  public transform(heros: Hero[], filter: string) {
    if (!heros || !heros.length) return [];
    if (!filter) return heros;
    return heros.filter((hero) => {
      if (hero.name) {
        return hero.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      } else {
        return true;
      }
    });
  }
}
@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .pipe(first())
      .subscribe((heroes) => (this.heroes = heroes));
  }
}
