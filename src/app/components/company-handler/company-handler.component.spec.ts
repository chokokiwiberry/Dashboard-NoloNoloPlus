import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyHandlerComponent } from './company-handler.component';

describe('CompanyHandlerComponent', () => {
  let component: CompanyHandlerComponent;
  let fixture: ComponentFixture<CompanyHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
