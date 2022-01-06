import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryStatisticsComponent } from './inventory-statistics.component';

describe('InventoryStatisticsComponent', () => {
  let component: InventoryStatisticsComponent;
  let fixture: ComponentFixture<InventoryStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryStatisticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
