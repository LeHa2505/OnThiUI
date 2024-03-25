import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExelFileComponent } from './exel-file.component';

describe('ExelFileComponent', () => {
  let component: ExelFileComponent;
  let fixture: ComponentFixture<ExelFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExelFileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExelFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
