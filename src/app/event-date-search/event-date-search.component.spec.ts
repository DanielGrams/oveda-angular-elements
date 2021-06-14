/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { NgbButtonsModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EventDateSearchItem, EventDateSearchResponse } from '@oveda/oveda-api';
import { DateFilterComponent } from '../shared/date-filter/date-filter.component';
import { asyncData } from '../testutils';

import { EventDateSearchComponent } from './event-date-search.component';

describe('EventDateSearchComponent', () => {
  let component: EventDateSearchComponent;
  let fixture: ComponentFixture<EventDateSearchComponent>;
  let eventDatesService: any;
  let dateFilterComponent: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventDateSearchComponent, DateFilterComponent],
      imports: [HttpClientModule, NgbPaginationModule, NgbButtonsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDateSearchComponent);
    component = fixture.componentInstance;

    eventDatesService = jasmine.createSpyObj('EventDatesService', ['apiV1EventDatesSearchGet']);
    component.eventDatesService = eventDatesService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should paginate', fakeAsync(() => {
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

    // Load events
    tick();
    fixture.detectChanges();
    const page2Link = fixture.nativeElement.querySelector('ngb-pagination > ul > li:nth-child(4) > a');
    expect(page2Link.textContent).toContain('2');

    // Load second page
    page2Link.click();
    tick();
    fixture.detectChanges();
  }));

  it('should filter date', fakeAsync(() => {
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
    component.datefilterpreset = 'today';

    // Load events
    tick();
    fixture.detectChanges();

    // Change filter
    component.datefilterpreset = 'tomorrow';
    tick();
    fixture.detectChanges();

    // Load events
    component.dateFilterChanged('all');
    tick();
    fixture.detectChanges();
  }));

  it('should create service', () => {
    const newComponent = new EventDateSearchComponent(TestBed.get(HttpClient));
    newComponent.ngOnInit();
    expect(newComponent.eventDatesService).toBeTruthy();
  });
});
