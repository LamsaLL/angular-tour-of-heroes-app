import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../data/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../service/hero.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { maxStatHero } from '../shared/max-stat-hero.directive';
import { Weapon } from '../data/weapon';
import { WeaponService } from '../service/weapon.service';
import { ToastrService } from 'ngx-toastr';

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
    private location: Location,
    private toastr: ToastrService
  ) {}

  createForm() {
    this.heroForm = new FormGroup(
      {
        name: new FormControl('', Validators.required),
        attack: new FormControl('', [Validators.required, Validators.min(1)]),
        dodge: new FormControl('', [Validators.required, Validators.min(1)]),
        lp: new FormControl('', [Validators.required, Validators.min(1)]),
        weaponId: new FormControl('', Validators.required),
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
    this.createForm();
    this.getHero();
    this.getWeapons();
  }

  onSubmit() {
    if (this.heroForm.valid) {
      this.heroService.updateHero({
        id: this.hero?.id,
        ...this.heroForm.value,
      });
      this.toastr.success('Hero updated', 'Success');
    } else {
      this.toastr.error('Form is not valid', 'Error');
    }
  }

  goBack(): void {
    this.location.back();
  }

  getHero(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => {
      this.hero = hero;

      this.heroForm.patchValue({
        name: this.hero?.name,
        attack: this.hero?.attack,
        dodge: this.hero?.dodge,
        lp: this.hero?.lp,
      });

      if (this.hero?.weaponId !== undefined) {
        this.weaponService
          .getWeapon(this.hero?.weaponId)
          .subscribe((weapon) => {
            this.weapon = weapon;
            this.heroForm.patchValue({ weaponId: this.weapon?.id });
          });
      }
    });
  }

  getWeapons(): void {
    this.weaponService.getWeapons().subscribe((weapons) => {
      this.weapons = weapons;
    });
  }
}
