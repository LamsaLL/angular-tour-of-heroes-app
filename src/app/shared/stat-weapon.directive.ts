import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** A weapon's stat can't be different than 0 points */
export const statWeapon: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const attack = control.get('attack');
  const dodge = control.get('dodge');
  const lp = control.get('lp');

  const summ = attack?.value + dodge?.value + lp?.value;
  return summ !== 0 ? { statWeapon: true } : null;
};
