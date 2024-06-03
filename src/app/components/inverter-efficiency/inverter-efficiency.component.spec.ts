import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InverterEfficiencyComponent } from './inverter-efficiency.component';

describe('InverterEfficiencyComponent', () => {
  let component: InverterEfficiencyComponent;
  let fixture: ComponentFixture<InverterEfficiencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InverterEfficiencyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InverterEfficiencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
