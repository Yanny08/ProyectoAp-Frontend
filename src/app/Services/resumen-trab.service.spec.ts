import { TestBed } from '@angular/core/testing';

import { ResumenTrabService } from './resumen-trab.service';

describe('ResumenTrabService', () => {
  let service: ResumenTrabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumenTrabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
