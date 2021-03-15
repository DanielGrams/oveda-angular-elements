import { HttpClient } from '@angular/common/http';
import { Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { OrganizationsService, Organization, EventDateSearchResponse, Configuration } from '@oveda/oveda-api';
import { Observable } from 'rxjs';
import { StatusContent } from '../statuscontent';

@Component({
  selector: 'app-organization-landing-page',
  templateUrl: './organization-landing-page.component.html',
  styleUrls: ['./organization-landing-page.component.scss'],
})
export class OrganizationLandingPageComponent implements OnInit {
  @Input() organizationid: any;
  @Input() basepath = '';
  page = 1;
  perPage = 10;

  readonly organization: StatusContent<Organization>;
  loadOrganization: () => Observable<Organization | undefined>;

  readonly dates: StatusContent<EventDateSearchResponse>;
  loadDates: () => Observable<EventDateSearchResponse | undefined>;

  private organizationsService!: OrganizationsService;

  constructor(private httpClient: HttpClient) {
    this.loadOrganization = () => this.organizationsService.apiV1OrganizationsIdGet(this.organizationid);
    this.organization = new StatusContent<Organization>(this.loadOrganization);

    this.loadDates = () =>
      this.organizationsService.apiV1OrganizationsIdEventDatesSearchGet(this.organizationid, this.page, this.perPage);
    this.dates = new StatusContent<EventDateSearchResponse>(this.loadDates);
  }

  ngOnInit(): void {
    this.organizationsService = new OrganizationsService(this.httpClient, this.basepath, new Configuration());
    this.organization.trigger$.next(undefined);
    this.dates.trigger$.next(undefined);
  }

  onDatesPageChange(page: number) {
    this.page = page;
    this.dates.trigger$.next(undefined);
  }
}
