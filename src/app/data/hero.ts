import { Serializable } from './serializable';
import { Weapon } from './weapon';

export class Hero extends Serializable {
  id?: string;
  name?: string;
  attack?: number;
  dodge?: number;
  lp?: number;
  weaponId?: string;

  constructor() {
    super();
  }
}
