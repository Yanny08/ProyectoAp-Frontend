import { TestBed } from '@angular/core/testing';

import { ResumenEduService } from './resumen-edu.service';

describe('ResumenEduService', () => {
  let service: ResumenEduService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumenEduService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
