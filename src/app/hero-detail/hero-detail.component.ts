import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../data/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../service/hero.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  id?: string;
  weapon?: Weapon;
  @Input() weapons?: Weapon[];
  heroForm!: FormGroup;

  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private weaponService: WeaponService,
    private location: Location,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  createForm() {
    this.heroForm = this.fb.group(
      {
        name: [, Validators.required],
        attack: [1, [Validators.required, Validators.min(1)]],
        dodge: [1, [Validators.required, Validators.min(1)]],
        lp: [1, [Validators.required, Validators.min(1)]],
        damages: [1, [Validators.required, Validators.min(1)]],
        weaponId: [],
      },
      { validators: maxStatHero }
    );
  }

  // get points left to distribute to the hero
  get pointsLeft(): number {
    const attack = this.heroForm.get('attack')?.value;
    const dodge = this.heroForm.get('dodge')?.value;
    const lp = this.heroForm.get('lp')?.value;
    const damages = this.heroForm.get('damages')?.value;

    return Math.abs(40 - attack - dodge - lp - damages);
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.createForm();
      this.getWeapons();
      // if id is defined
      if (this.id) {
        this.getHero();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    if (this.heroForm.valid) {
      // if id is defined, we update the hero else we create a new one
      if (this.id) {
        this.heroService.updateHero({
          id: this.hero?.id,
          ...this.heroForm.value,
        });
        this.toastr.success('Hero updated', 'Success');
      } else {
        this.heroService.addHero(this.heroForm.value);
        this.toastr.success('Hero created', 'Success');
      }
    } else {
      this.toastr.error('Form is not valid', 'Error');
    }
  }

  goBack(): void {
    this.location.back();
  }

  getHero(): void {
    if (this.id) {
      this.heroService.getHero(this.id).subscribe((hero) => {
        this.hero = hero;
        // we populate the form with the hero's data
        this.heroForm.patchValue({
          name: this.hero?.name,
          attack: this.hero?.attack,
          dodge: this.hero?.dodge,
          lp: this.hero?.lp,
          damages: this.hero?.damages,
        });

        if (this.hero?.weaponId !== undefined) {
          this.weaponService
            .getWeapon(this.hero?.weaponId)
            .subscribe((weapon) => {
              // we populate the form with the hero's weapon
              this.weapon = weapon;
              this.heroForm.patchValue({ weaponId: this.weapon?.id });
            });
        }
      });
    }
  }

  getWeapons(): void {
    this.weaponService.getWeapons().subscribe((weapons) => {
      this.weapons = weapons;
    });
  }
}
