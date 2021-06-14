import { HttpClient } from '@angular/common/http';
import { Input, OnInit, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { EventDatesService, EventDateSearchResponse, Configuration } from '@oveda/oveda-api';
import { Observable, of } from 'rxjs';
import { StatusContent } from '../statuscontent';
import { DateFilterComponent } from '../shared/date-filter/date-filter.component';

@Component({
  selector: 'app-event-date-search',
  templateUrl: './event-date-search.component.html',
  styleUrls: ['./event-date-search.component.css'],
})
export class EventDateSearchComponent implements OnInit {
  @Input() basepath = '';
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

  readonly dates: StatusContent<EventDateSearchResponse>;
  loadDates: () => Observable<EventDateSearchResponse | undefined>;

  public eventDatesService!: EventDatesService;

  private _dateFilterComponent: DateFilterComponent | undefined;
  private _dateFilterPreset = '';

  constructor(private httpClient: HttpClient) {
    this.loadDates = () => {
      if (!this._dateFilterComponent) {
        return of(undefined);
      }

      return this.eventDatesService.apiV1EventDatesSearchGet(
        this.page,
        this.perPage,
        undefined,
        this._dateFilterComponent.dateFrom.format('YYYY-MM-DD'),
        this._dateFilterComponent.dateTo.format('YYYY-MM-DD')
      );
    };
    this.dates = new StatusContent<EventDateSearchResponse>(this.loadDates);
  }

  ngOnInit(): void {
    if (!this.eventDatesService) {
      this.eventDatesService = new EventDatesService(this.httpClient, this.basepath, new Configuration());
    }
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
