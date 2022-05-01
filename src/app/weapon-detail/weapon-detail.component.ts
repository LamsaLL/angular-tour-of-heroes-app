import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Weapon } from '../data/weapon';
import { WeaponService } from '../service/weapon.service';
import { statWeapon } from '../shared/stat-weapon.directive';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css'],
})
export class WeaponDetailComponent implements OnInit {
  @Input() weapon?: Weapon;
  id?: number;
  weaponForm!: FormGroup;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private location: Location,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  createForm() {
    this.weaponForm = this.fb.group(
      {
        name: ['', Validators.required],
        attack: [
          '',
          [Validators.required, Validators.min(-5), Validators.max(5)],
        ],
        dodge: [
          '',
          [Validators.required, Validators.min(-5), Validators.max(5)],
        ],
        lp: ['', [Validators.required, Validators.min(-5), Validators.max(5)]],
      },
      { validators: statWeapon }
    );
  }

  // get points left to distribute  to  the  weapon
  get pointsLeft(): number {
    const attack = this.weaponForm.get('attack')?.value;
    const dodge = this.weaponForm.get('dodge')?.value;
    const lp = this.weaponForm.get('lp')?.value;
    const summ = attack + dodge + lp;
    return 0 - summ;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.createForm();
      // if id is not defined, it is a new hero
      if (this.id) {
        this.getWeapon();
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit() {
    if (this.weaponForm.valid) {
      if (this.id) {
        this.weaponService.updateWeapon({
          id: this.weapon?.id,
          ...this.weaponForm.value,
        });
        this.toastr.success('Weapon updated', 'Success');
      } else {
        this.weaponService.addWeapon(this.weaponForm.value);
        this.toastr.success('Weapon created', 'Success');
        console.log('Weapon created', this.weaponForm.value);
      }
    } else {
      this.toastr.success('Form is not valid', 'Error');
    }
  }

  goBack(): void {
    this.location.back();
  }

  getWeapon(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.weaponService.getWeapon(id).subscribe((weapon) => {
      this.weapon = weapon;
      this.weaponForm.patchValue({
        name: this.weapon?.name,
        attack: this.weapon?.attack,
        dodge: this.weapon?.dodge,
        lp: this.weapon?.lp,
      });
    });
  }
}
