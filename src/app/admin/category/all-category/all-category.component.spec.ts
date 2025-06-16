import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllCategoryComponent } from './all-category.component';

describe('AllCategoryComponent', () => {
  let component: AllCategoryComponent;
  let fixture: ComponentFixture<AllCategoryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AllCategoryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
