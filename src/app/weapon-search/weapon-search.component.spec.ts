import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponSearchComponent } from './weapon-search.component';

describe('WeaponSearchComponent', () => {
  let component: WeaponSearchComponent;
  let fixture: ComponentFixture<WeaponSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeaponSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
