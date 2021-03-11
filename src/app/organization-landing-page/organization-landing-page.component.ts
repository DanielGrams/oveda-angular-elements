import { Input, OnInit } from '@angular/core';
import { Component, ViewEncapsulation } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { EventDateSearchResponse } from '@oveda/oveda-api/model/eventDateSearchResponse';
import { OrganizationsService } from '@oveda/oveda-api/api/organizations.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, publishReplay, refCount } from 'rxjs/operators';
import { StatusContent } from '../utils';

@Component({
  selector: 'app-organization-landing-page',
  templateUrl: './organization-landing-page.component.html',
  styleUrls: ['./organization-landing-page.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class OrganizationLandingPageComponent implements OnInit {
  @Input() organizationid: any;
  page = 1;
  perPage = 10;

  readonly dates: StatusContent<EventDateSearchResponse>;
  loadDates: () => Observable<EventDateSearchResponse | undefined>;

  constructor(private organizationsService: OrganizationsService) {
    this.loadDates = () =>
      this.organizationsService.apiV1OrganizationsIdEventDatesSearchGet(this.organizationid, this.page, this.perPage);
    this.dates = new StatusContent<EventDateSearchResponse>(this.loadDates);
  }

  ngOnInit(): void {
    this.dates.trigger$.next(undefined);
  }

  handleDatesPageEvent(event: PageEvent) {
    this.perPage = event.pageSize;
    this.page = event.pageIndex + 1;
    this.dates.trigger$.next(undefined);
  }
}
