import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** A hero's stat can't be greater than 40 points */
export const maxStatHero: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const attack = control.get('attack');
  const dodge = control.get('dodge');
  const lp = control.get('lp');
  const damages = control.get('damages');

  const summ = attack?.value + dodge?.value + lp?.value + damages?.value;
  return summ > 40 ? { maxStatHero: true } : null;
};
