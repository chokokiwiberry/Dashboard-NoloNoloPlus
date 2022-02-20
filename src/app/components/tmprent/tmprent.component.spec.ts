import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmprentComponent } from './tmprent.component';

describe('TmprentComponent', () => {
  let component: TmprentComponent;
  let fixture: ComponentFixture<TmprentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TmprentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TmprentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
