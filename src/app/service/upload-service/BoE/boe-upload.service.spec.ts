import { TestBed } from '@angular/core/testing';

import { BoeUploadService } from './boe-upload.service';

describe('BoeUploadService', () => {
  let service: BoeUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoeUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
