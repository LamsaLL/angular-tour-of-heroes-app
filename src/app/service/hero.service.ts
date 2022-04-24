import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Hero } from '../data/hero';
import { MessageService } from '../service/message.service';

import { map } from 'rxjs/operators';
import { JsonArray } from '@angular/compiler-cli/ngcc/src/packages/entry_point';
import {
  Action,
  AngularFirestore,
  AngularFirestoreDocument,
  DocumentChangeAction,
  DocumentSnapshot,
} from '@angular/fire/compat/firestore';
import { WeaponService } from './weapon.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  // URL d'accès aux documents sur Firebase
  private static url = 'heroes';

  constructor(
    private messageService: MessageService,
    private weaponService: WeaponService,
    private db: AngularFirestore
  ) {}

  /**
   * Récupération de la liste des héros
   */
  getHeroes(): Observable<Hero[]> {
    //
    this.messageService.add('HeroService: fetched heroes');

    //
    return this.db
      .collection<JsonArray>(HeroService.url)
      .snapshotChanges()
      .pipe(
        map((documents) => {
          return documents.map((document) => {
            return this.transformDocumentChangeActionToHero(document);
          });
        })
      );
  }

  /**
   * Récupération des 3 premiers héros
   */
  getHeroesTop3(): Observable<Hero[]> {
    //
    this.messageService.add('HeroService: fetched heroes');

    //
    return this.db
      .collection<JsonArray>(HeroService.url, (ref) => ref.limit(3))
      .snapshotChanges()
      .pipe(
        map((documents) => {
          return documents.map((document) => {
            return this.transformDocumentChangeActionToHero(document);
          });
        })
      );
  }

  /**
   * Récupération d'un document spécifique à l'aide de son id
   * @param id
   * @private
   */
  private getHeroDocument(id: string): AngularFirestoreDocument<JsonArray> {
    // return document
    return this.db.doc<JsonArray>(HeroService.url + `/` + id);
  }

  /**
   * Récupération d'un héro spécifique à l'aide de son id
   * @param id
   */
  getHero(id: string): Observable<Hero | undefined> {
    //
    this.messageService.add(`HeroService: fetched hero id=${id}`);

    // Return hero observable
    return this.getHeroDocument(id)
      .snapshotChanges()
      .pipe(
        map((document) => {
          return this.transformDocumentSnapshotToHero(id, document);
        })
      );
  }

  /**
   * Ajout d'un héro sur Firebase
   * @param hero
   */
  addHero(hero: Hero) {
    this.db.collection(HeroService.url).add(hero.toJSON());
    //this.db.collection(HeroService.url).add(JSON.stringify(hero));
    //this.db.collection<JSON>(HeroService.url).add(Object.assign({}, hero));
  }

  /**
   * Modification du héro sur Firebase
   * @param hero
   */
  updateHero(hero: Hero) {
    // Update document
    console.log(hero);
    if (hero.id != undefined) {
      this.getHeroDocument(hero.id).update(Object.assign({}, hero) as {});
    }

    //this.getHeroDocument(id).update(JSON.stringify(hero));
    //this.getHeroDocument(id).update(Object.assign({}, hero));
  }

  deleteHero(hero: Hero) {
    // Delete the document
    if (hero.id != undefined) {
      this.getHeroDocument(hero.id).delete();
    }
  }

  /**
   * Transformation du document reçu en un objet de type Hero
   * @param a
   * @private
   */
  private transformDocumentChangeActionToHero(
    a: DocumentChangeAction<JsonArray>
  ): Hero {
    // Get document data
    const data = a.payload.doc.data();

    // New Hero
    const hero = new Hero().fromJSON(data);

    // Get document id
    const id = a.payload.doc.id;
    hero.id = id;

    return hero;
  }

  /**
   * Transformation du document reçu en un objet de type Hero
   * @private
   */
  private transformDocumentSnapshotToHero(
    id: string,
    document: Action<DocumentSnapshot<JsonArray>>
  ): Hero | undefined {
    // Get document data
    const data = document.payload.data();

    // New Hero
    let hero;
    if (data != undefined) {
      hero = new Hero().fromJSON(data);
      hero.id = id;
    }

    // Use spread operator to add the id to the document data
    return hero;
  }
}
