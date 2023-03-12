import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalScrollComponent } from './horizontal-scroll.component';

describe('HorizontalScrollComponent', () => {
  let component: HorizontalScrollComponent;
  let fixture: ComponentFixture<HorizontalScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalScrollComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
