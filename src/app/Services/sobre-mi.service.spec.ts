import { TestBed } from '@angular/core/testing';

import { SobreMiService } from './sobre-mi.service';

describe('SobreMiService', () => {
  let service: SobreMiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SobreMiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
