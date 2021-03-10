import { Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventDateSearchResponse } from '../../model/eventDateSearchResponse';

@Component({
  selector: 'app-organization-landing-page',
  templateUrl: './organization-landing-page.component.html',
  styleUrls: ['./organization-landing-page.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class OrganizationLandingPageComponent implements OnInit, OnChanges {
  @Input() organizationId: any;
  response?: EventDateSearchResponse;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  loadData() {
    if (this.organizationId == null) {
      return;
    }

    const url = `https://oveda.de/api/v1/organizations/${this.organizationId}/event-dates/search`;
    this.httpClient.get<EventDateSearchResponse>(url).subscribe((data) => {
      this.response = data;
      console.log(this.response);
    });
  }
}
