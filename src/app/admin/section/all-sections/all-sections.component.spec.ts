import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllSectionsComponent } from './all-sections.component';

describe('AllSectionsComponent', () => {
  let component: AllSectionsComponent;
  let fixture: ComponentFixture<AllSectionsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AllSectionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
