import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { WeaponSearchService } from '../service/weapon-search.service';
import { Weapon } from '../data/weapon';
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
  selector: 'weapon-search',
  templateUrl: 'weapon-search.component.html',
  styleUrls: ['weapon-search.component.css'],
  providers: [WeaponSearchService],
})
export class WeaponSearchComponent implements OnInit {
  weapons: Observable<Weapon[]> | undefined;
  private searchTerms = new Subject<string>();
  public currSearch: string = '';

  constructor(
    private weaponSearchService: WeaponSearchService,
    private router: Router
  ) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.currSearch = term;
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.weapons = this.searchTerms.pipe(
      debounceTime(300), // wait for 300ms pause in events
      distinctUntilChanged(), // ignore if next search term is same as previous
      switchMap((term) =>
        term // switch to new observable each time
          ? this.weaponSearchService.search(term) // return the http search observable
          : // or the observable of empty weapons if no search term
            of<Weapon[]>([])
      ),
      catchError((err) => {
        console.log(err);
        return of<Weapon[]>([]);
      })
    );
  }

  gotoDetail(weapon: Weapon): void {
    let link = ['/detail', weapon.id];
    this.router.navigate(link);
  }
}
