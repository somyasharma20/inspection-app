import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AllUsersComponent } from './all-users.component';

describe('AllUsersComponent', () => {
  let component: AllUsersComponent;
  let fixture: ComponentFixture<AllUsersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AllUsersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
