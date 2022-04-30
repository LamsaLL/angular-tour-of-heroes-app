import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeroSearchService } from '../service/hero-search.service';
import { Hero } from '../data/hero';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
  catchError,
  of,
} from 'rxjs';

@Component({
  selector: 'hero-search',
  templateUrl: 'hero-search.component.html',
  styleUrls: ['hero-search.component.css'],
  providers: [HeroSearchService],
})
export class HeroSearchComponent implements OnInit {
  heroes: Observable<Hero[]> | undefined;
  private searchTerms = new Subject<string>();
  public currSearch: string = '';

  constructor(
    private heroSearchService: HeroSearchService,
    private router: Router
  ) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.currSearch = term;
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes = this.searchTerms.pipe(
      debounceTime(300), // wait for 300ms pause in events
      distinctUntilChanged(), // ignore if next search term is same as previous
      switchMap((term) =>
        term // switch to new observable each time
          ? this.heroSearchService.search(term) // return the http search observable
          : // or the observable of empty heroes if no search term
            of<Hero[]>([])
      ),
      catchError((err) => {
        console.log(err);
        return of<Hero[]>([]);
      })
    );
  }

  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }
}
