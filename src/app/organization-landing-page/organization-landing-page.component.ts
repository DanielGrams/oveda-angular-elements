import { Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventDateSearchResponse } from '../../model/eventDateSearchResponse';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-organization-landing-page',
  templateUrl: './organization-landing-page.component.html',
  styleUrls: ['./organization-landing-page.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class OrganizationLandingPageComponent implements OnInit, OnChanges {
  @Input() organizationid: any;
  response?: EventDateSearchResponse;
  page = 1;
  per_page = 10;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    console.log('init');
    console.log(this.organizationid);
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.loadData();
  }

  loadData() {
    if (this.organizationid == null) {
      return;
    }

    const url = `https://oveda.de/api/v1/organizations/${this.organizationid}/event-dates/search?page=${this.page}&per_page=${this.per_page}`;
    this.httpClient.get<EventDateSearchResponse>(url).subscribe((data) => {
      this.response = data;
      console.log(data);
    });
  }

  handlePageEvent(event: PageEvent) {
    this.per_page = event.pageSize;
    this.page = event.pageIndex + 1;
    this.loadData();
  }
}
