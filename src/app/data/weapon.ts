import { Serializable } from './serializable';

export class Weapon extends Serializable {
  id?: string;
  name?: string;
  attack?: number;
  dodge?: number;
  lp?: number;

  constructor() {
    super();
  }
}
