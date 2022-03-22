import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../data/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../service/hero.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { maxStatHero } from '../shared/max-stat-hero.directive';
import { Weapon } from '../data/weapon';
import { WeaponService } from '../service/weapon.service';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: Hero;
  weapon?: Weapon;
  @Input() weapons?: Weapon[];

  heroForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private weaponService: WeaponService,
    private location: Location
  ) {
    this.createForm();
  }

  createForm() {
    console.log(this.hero?.weaponId);
    this.heroForm = new FormGroup(
      {
        name: new FormControl(this.hero?.name, Validators.required),
        attack: new FormControl(this.hero?.attack, [
          Validators.required,
          Validators.min(1),
        ]),
        dodge: new FormControl(this.hero?.dodge, [
          Validators.required,
          Validators.min(1),
        ]),
        lp: new FormControl(this.hero?.lp, [
          Validators.required,
          Validators.min(1),
        ]),
        weaponName: new FormControl(
          this.hero?.weaponId?.id ?? '',
          Validators.required
        ),
      },
      { validators: maxStatHero }
    );
  }

  // get points left to distribute  to  the  hero
  get pointsLeft(): number {
    const attack = this.heroForm.get('attack')?.value;
    const dodge = this.heroForm.get('dodge')?.value;
    const lp = this.heroForm.get('lp')?.value;
    return 40 - attack - dodge - lp;
  }

  ngOnInit(): void {
    this.getHero();
    this.getWeapons();
  }

  onSubmit() {
    if (this.heroForm.valid) {
      this.heroService.updateHero({
        id: this.hero?.id,
        ...this.heroForm.value,
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  getHero(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => {
      this.hero = hero;
      this.createForm();

      if (this.hero?.weaponId?.id !== undefined) {
        this.weaponService
          .getWeapon(this.hero?.weaponId.id)
          .subscribe((weapon) => {
            this.weapon = weapon;
          });
      }
    });
  }

  getWeapons(): void {
    this.weaponService.getWeapons().subscribe((weapons) => {
      this.weapons = weapons;
      console.log(weapons);
    });
  }
}
