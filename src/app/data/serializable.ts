import { JsonArray } from '@angular/compiler-cli/ngcc/src/packages/entry_point';

export class Serializable {
  fromJSON(json: JsonArray) {
    for (const propName in json) {
      if (json.hasOwnProperty(propName)) {
        (this as any)[propName] = json[propName];
      }
    }
    return this;
  }

  toJSON() {
    return Object.assign({}, this);
  }
}
