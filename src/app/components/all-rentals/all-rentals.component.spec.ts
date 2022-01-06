import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRentalsComponent } from './all-rentals.component';

describe('AllRentalsComponent', () => {
  let component: AllRentalsComponent;
  let fixture: ComponentFixture<AllRentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllRentalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
