import { Component, OnInit, Pipe } from '@angular/core';
import { first } from 'rxjs';

import { Hero } from '../data/hero';
import { HeroService } from '../service/hero.service';
import { MessageService } from '../service/message.service';
import { ToastrService } from '../../../node_modules/ngx-toastr';
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

  constructor(
    private heroService: HeroService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  delete(hero: Hero): void {
    try {
      this.heroes = this.heroes.filter((h) => h !== hero);
      this.heroService.deleteHero(hero);
      this.toastr.success('Hero deleted successfully.');
    } catch (e) {
      console.log(e);
      this.toastr.error('Error deleting hero.');
    }
  }

  getHeroes(): void {
    this.heroService
      .getHeroes()
      .pipe(first())
      .subscribe((heroes) => (this.heroes = heroes));
  }
}
