import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsamDialogComponent } from './departmentsam-dialog.component';

describe('DepartmentsamDialogComponent', () => {
  let component: DepartmentsamDialogComponent;
  let fixture: ComponentFixture<DepartmentsamDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentsamDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DepartmentsamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
