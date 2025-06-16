import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobdetailComponent } from './add-jobdetail.component';

describe('AddJobdetailComponent', () => {
  let component: AddJobdetailComponent;
  let fixture: ComponentFixture<AddJobdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddJobdetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddJobdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
