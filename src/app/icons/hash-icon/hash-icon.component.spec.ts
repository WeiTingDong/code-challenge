import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HashIconComponent } from './hash-icon.component';

describe('HashIconComponent', () => {
  let component: HashIconComponent;
  let fixture: ComponentFixture<HashIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HashIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HashIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
