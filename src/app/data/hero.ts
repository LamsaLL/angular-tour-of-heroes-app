import { Serializable } from './serializable';

export class Hero extends Serializable {
  id?: string;
  name?: string;
  attack?: number;
  dodge?: number;
  lp?: number;

  constructor() {
    super();
  }

  uneMethode(): string {
    return 'le nom de mon hero' + this.name;
  }
}
