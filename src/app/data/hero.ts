import { Serializable } from './serializable';

export class Hero extends Serializable {
  id?: string;
  name?: string;
  attack?: number;
  dodge?: number;
  lp?: number;
  damages?: number;
  weaponId?: string;

  constructor() {
    super();
  }
}
