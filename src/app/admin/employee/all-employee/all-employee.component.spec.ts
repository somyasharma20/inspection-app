import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllEmployeeComponent } from './all-employee.component';

describe('AllUsersComponent', () => {
  let component: AllEmployeeComponent;
  let fixture: ComponentFixture<AllEmployeeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AllEmployeeComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
