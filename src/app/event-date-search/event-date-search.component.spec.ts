/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { EventDatesService, EventDateSearchItem, EventDateSearchResponse } from '@oveda/oveda-api';
import { asyncData } from '../testutils';

import { EventDateSearchComponent } from './event-date-search.component';

describe('EventDateSearchComponent', () => {
  let component: EventDateSearchComponent;
  let fixture: ComponentFixture<EventDateSearchComponent>;
  let eventDatesService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventDateSearchComponent],
      imports: [HttpClientModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDateSearchComponent);
    component = fixture.componentInstance;
    eventDatesService = jasmine.createSpyObj('EventDatesService', ['apiV1EventDatesSearchGet']);
    component.eventDatesService = eventDatesService;
  });

  it('should create service', () => {
    const newComponent = new EventDateSearchComponent(TestBed.get(HttpClient));
    newComponent.ngOnInit();
    expect(newComponent.eventDatesService).toBeTruthy();
  });

  it(
    'should paginate',
    waitForAsync(() => {
      const eventDates: Array<EventDateSearchItem> = [];
      for (let index = 0; index < 11; index++) {
        eventDates.push({ start: new Date() });
      }
      const response: EventDateSearchResponse = {
        has_next: true,
        has_prev: false,
        items: eventDates,
        page: 1,
        pages: 2,
        per_page: 10,
        total: 11,
      };

      eventDatesService.apiV1EventDatesSearchGet.and.returnValue(asyncData(response));

      fixture.detectChanges();
      expect(component).toBeTruthy();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component.onDatesPageChange(2);
      });
    })
  );

  it(
    'should filter date',
    waitForAsync(() => {
      const eventDates: Array<EventDateSearchItem> = [];
      eventDates.push({ start: new Date() });
      const response: EventDateSearchResponse = {
        has_next: false,
        has_prev: false,
        items: eventDates,
        page: 1,
        pages: 1,
        per_page: 10,
        total: 1,
      };

      eventDatesService.apiV1EventDatesSearchGet.and.returnValue(asyncData(response));

      fixture.detectChanges();
      expect(component).toBeTruthy();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        component.dateFilterChanged('today');
        component.dateFilterChanged('tomorrow');
        component.dateFilterChanged('thisweek');
        component.dateFilterChanged('thisweekend');
        component.dateFilterChanged('nextweek');
        component.dateFilterChanged('thismonth');
        component.dateFilterChanged('nextmonth');
        component.dateFilterChanged('all');
      });
    })
  );
});
