/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { NgbButtonsModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EventDateSearchItem, EventDateSearchResponse, Organization } from '@oveda/oveda-api';
import { of } from 'rxjs';
import { DateFilterComponent } from '../shared/date-filter/date-filter.component';
import { asyncData } from '../testutils';

import { OrganizationLandingPageComponent } from './organization-landing-page.component';

describe('OrganizationLandingPageComponent', () => {
  let component: OrganizationLandingPageComponent;
  let fixture: ComponentFixture<OrganizationLandingPageComponent>;
  let organizationsService: any;
  let dateFilterComponent: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrganizationLandingPageComponent, DateFilterComponent],
      imports: [HttpClientModule, NgbPaginationModule, NgbButtonsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationLandingPageComponent);
    component = fixture.componentInstance;

    organizationsService = jasmine.createSpyObj('OrganizationsService', [
      'apiV1OrganizationsIdGet',
      'apiV1OrganizationsIdEventDatesSearchGet',
    ]);
    component.organizationsService = organizationsService;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load organization', fakeAsync(() => {
    const organization: Organization = { id: 1, name: 'Goslar' };
    organizationsService.apiV1OrganizationsIdGet.and.returnValue(asyncData(organization));
    organizationsService.apiV1OrganizationsIdEventDatesSearchGet.and.returnValue(of(undefined));

    component.organizationid = 1;
    fixture.detectChanges();

    // Load organization
    tick();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Goslar');

    // Load events
    tick();
    fixture.detectChanges();
  }));

  it('should handle error', fakeAsync(() => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });
    organizationsService.apiV1OrganizationsIdGet.and.rejectWith(errorResponse);

    component.organizationid = 1;
    fixture.detectChanges();

    tick();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.alert').innerText).toContain('404');
  }));

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
    organizationsService.apiV1OrganizationsIdEventDatesSearchGet.and.returnValue(asyncData(response));

    const organization: Organization = { id: 1, name: 'Goslar' };
    organizationsService.apiV1OrganizationsIdGet.and.returnValue(asyncData(organization));

    component.organizationid = 1;
    fixture.detectChanges();

    // Load organization
    tick();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Goslar');

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

  it('should set DateFilter preset', fakeAsync(() => {
    const organization: Organization = { id: 1, name: 'Goslar' };
    organizationsService.apiV1OrganizationsIdGet.and.returnValue(asyncData(organization));
    organizationsService.apiV1OrganizationsIdEventDatesSearchGet.and.returnValue(of(undefined));

    component.organizationid = 1;
    component.datefilterpreset = 'today';
    fixture.detectChanges();

    // Load organization
    tick();
    fixture.detectChanges();

    // Load events
    tick();
    fixture.detectChanges();

    // Change filter
    component.datefilterpreset = 'tomorrow';
    fixture.detectChanges();
  }));

  it('should cancel loading when organizationid is not set', fakeAsync(() => {
    fixture.detectChanges();

    // Load organization
    tick();
    fixture.detectChanges();

    // Load events
    component.dateFilterChanged('all');
    tick();
    fixture.detectChanges();
  }));

  it('should create service', () => {
    const newComponent = new OrganizationLandingPageComponent(TestBed.get(HttpClient));
    newComponent.ngOnInit();
    expect(newComponent.organizationsService).toBeTruthy();
  });
});
