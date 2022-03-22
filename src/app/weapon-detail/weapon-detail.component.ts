import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Weapon } from '../data/weapon';
import { WeaponService } from '../service/weapon.service';
import { statWeapon } from '../shared/stat-weapon.directive';
import { Location } from '@angular/common';

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css'],
})
export class WeaponDetailComponent implements OnInit {
  @Input() weapon?: Weapon;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location
  ) {}

  weaponForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      attack: new FormControl('', [
        Validators.required,
        Validators.min(-5),
        Validators.max(5),
      ]),
      dodge: new FormControl('', [
        Validators.required,
        Validators.min(-5),
        Validators.max(5),
      ]),
      lp: new FormControl('', [
        Validators.required,
        Validators.min(-5),
        Validators.max(5),
      ]),
    },
    { validators: statWeapon }
  );

  // get points left to distribute  to  the  weapon
  get pointsLeft(): number {
    const attack = this.weaponForm.get('attack')?.value;
    const dodge = this.weaponForm.get('dodge')?.value;
    const lp = this.weaponForm.get('lp')?.value;
    const summ = attack + dodge + lp;
    return 0 - summ;
  }

  populateForm = (weapon: Weapon | undefined): void => {
    this.weaponForm.setValue({
      name: this.weapon?.name,
      attack: this.weapon?.attack,
      dodge: this.weapon?.dodge,
      lp: this.weapon?.lp,
    });
  };

  ngOnInit(): void {
    this.getWeapon();
  }

  onSubmit() {
    if (this.weaponForm.valid) {
      this.weaponService.updateWeapon({
        id: this.weapon?.id,
        ...this.weaponForm.value,
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  getWeapon(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.weaponService.getWeapon(id).subscribe((weapon) => {
      this.weapon = weapon;
      this.populateForm(this.weapon);
    });
  }
}
