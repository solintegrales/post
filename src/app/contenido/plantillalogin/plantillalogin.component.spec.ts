import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaloginComponent } from './plantillalogin.component';

describe('PlantillaloginComponent', () => {
  let component: PlantillaloginComponent;
  let fixture: ComponentFixture<PlantillaloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
