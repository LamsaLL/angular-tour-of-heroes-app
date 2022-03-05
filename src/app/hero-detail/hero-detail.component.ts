import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../data/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../service/hero.service';
import { FormControl, FormGroup } from '@angular/forms';
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
  heroForm = new FormGroup({
    name: new FormControl(''),
    attack: new FormControl(''),
    dodge: new FormControl(''),
    lp: new FormControl(''),
  });

  ngOnInit(): void {
    this.getHero();
    this.heroForm.setValue({
      name: this.hero?.name,
      attack: this.hero?.attack,
      dodge: this.hero?.dodge,
      lp: this.hero?.lp,
    });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.heroForm.value);
  }

  goBack(): void {
    this.location.back();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }
}
