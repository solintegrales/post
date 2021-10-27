import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasinsComponent } from './ventasins.component';

describe('VentasinsComponent', () => {
  let component: VentasinsComponent;
  let fixture: ComponentFixture<VentasinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
