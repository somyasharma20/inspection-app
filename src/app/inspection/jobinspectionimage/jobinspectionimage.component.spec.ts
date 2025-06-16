import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobinspectionimageComponent } from './jobinspectionimage.component';

describe('JobinspectionimageComponent', () => {
  let component: JobinspectionimageComponent;
  let fixture: ComponentFixture<JobinspectionimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobinspectionimageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobinspectionimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
