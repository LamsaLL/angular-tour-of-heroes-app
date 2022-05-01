import { Component, OnInit, Pipe } from '@angular/core';
import { Weapon } from '../data/weapon';
import { WeaponService } from '../service/weapon.service';
import { ToastrService } from 'ngx-toastr';
@Pipe({
  name: 'filterWeapons',
})
export class FilterWeaponPipe {
  public transform(weapons: Weapon[], filter: string) {
    if (!weapons || !weapons.length) return [];
    if (!filter) return weapons;
    return weapons.filter((weapons) => {
      if (weapons.name) {
        return weapons.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
      } else {
        return true;
      }
    });
  }
}
@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css'],
})
export class WeaponsComponent implements OnInit {
  weapons: Weapon[] = [];

  constructor(
    private weaponService: WeaponService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getWeapons();
  }

  delete(weapon: Weapon): void {
    try {
      this.weapons = this.weapons.filter((w) => w !== weapon);
      this.weaponService.deleteWeapon(weapon);
      this.toastr.success('Weapon deleted successfully.');
    } catch (e) {
      console.log(e);
      this.toastr.error('Error deleting weapon.');
    }
  }

  getWeapons(): void {
    this.weaponService
      .getWeapons()
      .subscribe((weapons) => (this.weapons = weapons));
  }
}
