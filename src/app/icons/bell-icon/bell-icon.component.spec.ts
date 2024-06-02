import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BellIconComponent } from './bell-icon.component';

describe('BellIconComponent', () => {
  let component: BellIconComponent;
  let fixture: ComponentFixture<BellIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BellIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BellIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
