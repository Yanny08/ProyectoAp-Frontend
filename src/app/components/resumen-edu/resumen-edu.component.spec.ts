import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenEduComponent } from './resumen-edu.component';

describe('ResumenEduComponent', () => {
  let component: ResumenEduComponent;
  let fixture: ComponentFixture<ResumenEduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenEduComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenEduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
