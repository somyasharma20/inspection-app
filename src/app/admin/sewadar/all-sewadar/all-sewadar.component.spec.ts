import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSewadarComponent } from './all-sewadar.component';

describe('AllSewadarComponent', () => {
  let component: AllSewadarComponent;
  let fixture: ComponentFixture<AllSewadarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSewadarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllSewadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
