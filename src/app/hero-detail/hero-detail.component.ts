import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../data/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../service/hero.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { maxStatHero } from '../shared/max-stat-hero.directive';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}
  // Une  base  de  40
  // points  est  à  répartir
  // − La somme de l’attaque, esquive, dégât et pv doit être inférieur ou égale à 40 ;
  // − Aucune caractéristique en dessous de 1pt ;
  // − Afficher les points restant à répartir pour aider l’utilisateur.
  heroForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      attack: new FormControl('', [Validators.required, Validators.min(1)]),
      dodge: new FormControl('', [Validators.required, Validators.min(1)]),
      lp: new FormControl('', [Validators.required, Validators.min(1)]),
    },
    { validators: maxStatHero }
  );

  // get points left to distribute  to  the  hero
  get pointsLeft(): number {
    const attack = this.heroForm.get('attack')?.value;
    const dodge = this.heroForm.get('dodge')?.value;
    const lp = this.heroForm.get('lp')?.value;
    return 40 - attack - dodge - lp;
  }

  populateForm = (hero: Hero | undefined): void => {
    this.heroForm.setValue({
      name: this.hero?.name,
      attack: this.hero?.attack,
      dodge: this.hero?.dodge,
      lp: this.hero?.lp,
    });
  };

  ngOnInit(): void {
    this.getHero();
  }

  onSubmit() {
    this.heroService.updateHero({ id: this.hero?.id, ...this.heroForm.value });
  }

  goBack(): void {
    this.location.back();
  }

  getHero(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => {
      this.hero = hero;
      this.populateForm(this.hero);
    });
  }
}
