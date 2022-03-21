import { Component, OnInit } from '@angular/core';
import { Weapon } from '../data/weapon';
import { WeaponService } from '../service/weapon.service';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css'],
})
export class WeaponsComponent implements OnInit {
  weapons: Weapon[] = [];

  constructor(private weaponService: WeaponService) {}

  ngOnInit(): void {
    this.getWeapones();
  }

  getWeapones(): void {
    this.weaponService
      .getWeapones()
      .subscribe((weapons) => (this.weapons = weapons));
  }
}
