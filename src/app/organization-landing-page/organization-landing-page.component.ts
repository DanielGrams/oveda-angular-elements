import { HttpClient } from '@angular/common/http';
import { Input, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { OrganizationsService, Organization, EventDateSearchResponse, Configuration } from '@oveda/oveda-api';
import { Observable, of } from 'rxjs';
import { DateFilterComponent } from '../shared/date-filter/date-filter.component';
import { StatusContent } from '../statuscontent';

@Component({
  selector: 'app-organization-landing-page',
  templateUrl: './organization-landing-page.component.html',
  styleUrls: ['./organization-landing-page.component.scss'],
})
export class OrganizationLandingPageComponent implements OnInit {
  @Input() basepath = '';
  @Input() set organizationid(value: any) {
    this._organizationId = value;
    this.organization.trigger$.next(undefined);
    this.dates.trigger$.next(undefined);
  }
  @Input() set datefilterpreset(value: string) {
    this._dateFilterPreset = value;
    if (this._dateFilterComponent) {
      this._dateFilterComponent.dateFilter = value;
    }
  }

  @ViewChild(DateFilterComponent)
  set dateFilterComponent(value: DateFilterComponent) {
    if (value === this._dateFilterComponent) {
      return;
    }

    this._dateFilterComponent = value;

    setTimeout(() => {
      if (this._dateFilterComponent && this._dateFilterPreset) {
        this._dateFilterComponent.dateFilter = this._dateFilterPreset;
      }
      this.dates.trigger$.next(undefined);
    });
  }
  page = 1;
  perPage = 10;

  readonly organization: StatusContent<Organization>;
  loadOrganization: () => Observable<Organization | undefined>;

  readonly dates: StatusContent<EventDateSearchResponse>;
  loadDates: () => Observable<EventDateSearchResponse | undefined>;

  public organizationsService!: OrganizationsService;

  private _organizationId: any;
  private _dateFilterPreset = '';
  private _dateFilterComponent: DateFilterComponent | undefined;

  constructor(private httpClient: HttpClient) {
    this.loadOrganization = () => {
      if (!this._organizationId) {
        return of(undefined);
      }

      return this.organizationsService.apiV1OrganizationsIdGet(this._organizationId);
    };
    this.organization = new StatusContent<Organization>(this.loadOrganization);

    this.loadDates = () => {
      if (!this._dateFilterComponent) {
        return of(undefined);
      }

      return this.organizationsService.apiV1OrganizationsIdEventDatesSearchGet(
        this._organizationId,
        this.page,
        this.perPage,
        undefined,
        this._dateFilterComponent.dateFrom.format('YYYY-MM-DD'),
        this._dateFilterComponent.dateTo.format('YYYY-MM-DD'),
        undefined,
        undefined,
        undefined,
        undefined,
        '-rating'
      );
    };
    this.dates = new StatusContent<EventDateSearchResponse>(this.loadDates);
  }

  ngOnInit(): void {
    if (!this.organizationsService) {
      this.organizationsService = new OrganizationsService(this.httpClient, this.basepath, new Configuration());
    }

    this.organization.trigger$.next(undefined);
  }

  onDatesPageChange(page: number) {
    this.page = page;
    this.dates.trigger$.next(undefined);
  }

  dateFilterChanged(value: string) {
    this.page = 1;
    this.dates.trigger$.next(undefined);
  }
}
