import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbButtonsModule, NgbRadioGroup } from '@ng-bootstrap/ng-bootstrap';

import { DateFilterComponent } from './date-filter.component';

describe('DateFilterComponent', () => {
  let component: DateFilterComponent;
  let fixture: ComponentFixture<DateFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateFilterComponent],
      imports: [NgbButtonsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateFilterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ignore unknown dateFilter', () => {
    expect(component.dateFilter).toBe('all');
    component.dateFilter = 'unknown';
    expect(component.dateFilter).toBe('all');
  });

  it('should filter date', () => {
    fixture.detectChanges();

    component.dateFilterChanged('all');
    component.dateFilterChanged('today');
    component.dateFilterChanged('tomorrow');
    component.dateFilterChanged('thisweek');
    component.dateFilterChanged('thisweekend');
    component.dateFilterChanged('nextweek');
    component.dateFilterChanged('thismonth');
    component.dateFilterChanged('nextmonth');
  });
});
