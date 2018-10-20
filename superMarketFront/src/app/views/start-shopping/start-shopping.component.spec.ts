import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartShoppingComponent } from './start-shopping.component';

describe('StartShoppingComponent', () => {
  let component: StartShoppingComponent;
  let fixture: ComponentFixture<StartShoppingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartShoppingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
