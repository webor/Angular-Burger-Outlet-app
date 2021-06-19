import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FilterRatingComponent } from './filter-rating.component';

describe('FilterRatingComponent', () => {
  let component: FilterRatingComponent;
  let fixture: ComponentFixture<FilterRatingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
