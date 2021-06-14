import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css'],
})
export class DateFilterComponent {
  get dateFilter(): string {
    return this.dateFilterPrivate;
  }
  @Input() set dateFilter(value: string) {
    if (!this.dateFilterValues.includes(value)) {
      return;
    }

    this.dateFilterPrivate = value;
    this.updateDates();
  }
  @Output() filterChangedEvent = new EventEmitter();

  dateFrom = moment();
  dateTo = moment(this.dateFrom).add(1, 'years');

  private readonly dateFilterValues = [
    'all',
    'today',
    'tomorrow',
    'thisweek',
    'thisweekend',
    'nextweek',
    'thismonth',
    'nextmonth',
  ];
  private dateFilterPrivate = 'all';

  constructor() {}

  dateFilterChanged(value: string) {
    this.dateFilter = value;
    this.updateDates();
    this.filterChangedEvent.emit();
  }

  private updateDates() {
    switch (this.dateFilterPrivate) {
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
  }
}
