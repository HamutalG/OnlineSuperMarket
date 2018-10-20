import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTotalsComponent } from './home-totals.component';

describe('HomeTotalsComponent', () => {
  let component: HomeTotalsComponent;
  let fixture: ComponentFixture<HomeTotalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTotalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTotalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
