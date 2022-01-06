import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsStatisticsComponent } from './rentals-statistics.component';

describe('RentalsStatisticsComponent', () => {
  let component: RentalsStatisticsComponent;
  let fixture: ComponentFixture<RentalsStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalsStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
