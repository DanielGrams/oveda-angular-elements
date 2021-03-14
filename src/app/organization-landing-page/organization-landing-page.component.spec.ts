/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { OrganizationsService, EventDateSearchItem, EventDateSearchResponse, Organization } from '@oveda/oveda-api';
import { asyncData } from '../testutils';

import { OrganizationLandingPageComponent } from './organization-landing-page.component';

describe('OrganizationLandingPageComponent', () => {
  let component: OrganizationLandingPageComponent;
  let fixture: ComponentFixture<OrganizationLandingPageComponent>;
  let organizationsService: any;

  beforeEach(async () => {
    organizationsService = jasmine.createSpyObj('OrganizationsService', [
      'apiV1OrganizationsIdGet',
      'apiV1OrganizationsIdEventDatesSearchGet',
    ]);
    await TestBed.configureTestingModule({
      declarations: [OrganizationLandingPageComponent],
      imports: [],
      providers: [{ provide: OrganizationsService, useValue: organizationsService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationLandingPageComponent);
    component = fixture.componentInstance;
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

      organizationsService.apiV1OrganizationsIdEventDatesSearchGet.and.returnValue(asyncData(response));

      const organization: Organization = { id: 1, name: 'Goslar' };
      organizationsService.apiV1OrganizationsIdGet.and.returnValue(asyncData(organization));

      component.organizationid = 1;
      fixture.detectChanges();
      expect(component).toBeTruthy();

      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('h1').textContent).toContain('Goslar');

        component.onDatesPageChange(2);
      });
    })
  );

  it('should handle error', fakeAsync(() => {
    const errorResponse = new HttpErrorResponse({
      error: 'test 404 error',
      status: 404,
      statusText: 'Not Found',
    });
    organizationsService.apiV1OrganizationsIdGet.and.rejectWith(errorResponse);

    component.organizationid = 1;
    fixture.detectChanges();
    expect(component).toBeTruthy();

    tick();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.alert').innerText).toContain('404');
  }));
});
