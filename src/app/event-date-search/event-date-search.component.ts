import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Input, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { EventDatesService, EventDateSearchResponse, Configuration } from '@oveda/oveda-api';
import { Observable } from 'rxjs';
import { StatusContent } from '../statuscontent';
import * as moment from 'moment';

@Component({
  selector: 'app-event-date-search',
  templateUrl: './event-date-search.component.html',
  styleUrls: ['./event-date-search.component.css'],
})
export class EventDateSearchComponent implements OnInit {
  @Input() basepath = '';
  page = 1;
  perPage = 10;
  dateFrom = moment();
  dateTo = moment(this.dateFrom).add(1, 'years');
  dateFilter = 'all';

  readonly dates: StatusContent<EventDateSearchResponse>;
  loadDates: () => Observable<EventDateSearchResponse | undefined>;

  public eventDatesService!: EventDatesService;

  constructor(private httpClient: HttpClient) {
    this.loadDates = () =>
      this.eventDatesService.apiV1EventDatesSearchGet(
        this.page,
        this.perPage,
        undefined,
        this.dateFrom.format('YYYY-MM-DD'),
        this.dateTo.format('YYYY-MM-DD')
      );
    this.dates = new StatusContent<EventDateSearchResponse>(this.loadDates);
  }

  ngOnInit(): void {
    if (!this.eventDatesService) {
      this.eventDatesService = new EventDatesService(this.httpClient, this.basepath, new Configuration());
    }

    this.dates.trigger$.next(undefined);
  }

  onDatesPageChange(page: number) {
    this.page = page;
    this.dates.trigger$.next(undefined);
  }

  dateFilterChanged(value: string) {
    this.dateFilter = value;
    this.page = 1;

    switch (value) {
      case 'today':
        this.dateFrom = moment();
        this.dateTo = moment(this.dateFrom).add(1, 'days');
        break;

      case 'tomorrow':
        this.dateFrom = moment().add(1, 'days');
        this.dateTo = moment(this.dateFrom).add(1, 'days');
        break;

      case 'thisweek':
        this.dateFrom = moment();
        this.dateTo = moment(this.dateFrom).startOf('isoWeek').add(1, 'weeks');
        break;

      case 'thisweekend':
        this.dateTo = moment().startOf('isoWeek').add(1, 'week');
        this.dateFrom = moment(this.dateTo).add(-3, 'days');
        break;

      case 'nextweek':
        this.dateFrom = moment().startOf('isoWeek').add(1, 'week');
        this.dateTo = moment(this.dateTo).add(1, 'weeks');
        break;

      case 'thismonth':
        this.dateFrom = moment();
        this.dateTo = moment(this.dateFrom).endOf('month').add(1, 'days');
        break;

      case 'nextmonth':
        this.dateFrom = moment().startOf('month').add(1, 'month');
        this.dateTo = moment(this.dateTo).add(1, 'months');
        break;

      default:
        this.dateFrom = moment();
        this.dateTo = moment(this.dateFrom).add(1, 'years');
        break;
    }

    this.dates.trigger$.next(undefined);
  }
}
