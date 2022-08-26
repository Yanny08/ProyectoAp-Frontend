import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenTrabComponent } from './resumen-trab.component';

describe('ResumenTrabComponent', () => {
  let component: ResumenTrabComponent;
  let fixture: ComponentFixture<ResumenTrabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenTrabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenTrabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
