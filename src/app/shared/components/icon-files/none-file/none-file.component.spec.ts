import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoneFileComponent } from './none-file.component';

describe('NoneFileComponent', () => {
  let component: NoneFileComponent;
  let fixture: ComponentFixture<NoneFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoneFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoneFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
