import { TestBed } from '@angular/core/testing';

import { ServiceLogicService } from './service-logic.service';

describe('ServiceLogicService', () => {
  let service: ServiceLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
