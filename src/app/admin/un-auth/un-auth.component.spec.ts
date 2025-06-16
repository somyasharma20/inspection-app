import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnAuthComponent } from './un-auth.component';

describe('UnAuthComponent', () => {
  let component: UnAuthComponent;
  let fixture: ComponentFixture<UnAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnAuthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
