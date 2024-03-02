import { TestBed } from '@angular/core/testing';

import { BolUploadService } from './bol-upload.service';

describe('BolUploadService', () => {
  let service: BolUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BolUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
