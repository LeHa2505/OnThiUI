import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfFileComponent } from './pdf-file.component';

describe('PdfFileComponent', () => {
  let component: PdfFileComponent;
  let fixture: ComponentFixture<PdfFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PdfFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
