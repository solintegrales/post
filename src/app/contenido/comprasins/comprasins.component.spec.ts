import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasinsComponent } from './comprasins.component';

describe('ComprasinsComponent', () => {
  let component: ComprasinsComponent;
  let fixture: ComponentFixture<ComprasinsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprasinsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
