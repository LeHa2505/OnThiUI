import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocFileComponent } from './doc-file.component';

describe('DocFileComponent', () => {
  let component: DocFileComponent;
  let fixture: ComponentFixture<DocFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
