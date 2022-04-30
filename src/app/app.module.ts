import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MessagesComponent } from './messages/messages.component';
import { WeaponsComponent } from './weapons/weapons.component';
import { WeaponDetailComponent } from './weapon-detail/weapon-detail.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HttpModule } from '@angular/http';
import { FilterHeroPipe } from './heroes/heroes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    WeaponsComponent,
    WeaponDetailComponent,
    HeroSearchComponent,
    HeroSearchComponent,
    FilterHeroPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    //provideFirestore(() => getFirestore())
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    HttpModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
