import { Input, Output, EventEmitter } from '@angular/core';
import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EventDateSearchResponse } from '../../model/eventDateSearchResponse';

@Component({
  selector: 'app-organization-landing-page',
  templateUrl: './organization-landing-page.component.html',
  styleUrls: ['./organization-landing-page.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class OrganizationLandingPageComponent {
  @Input() label = 'Mein Button';
  @Input() textColor = 'gray';
  @Input() backgroundColor = 'white';
  @Input() highlightColor = 'orange';
  @Output() action: EventEmitter<boolean> = new EventEmitter<boolean>(false);

  isHighlighted = false;
  response: EventDateSearchResponse | undefined;

  constructor(private httpClient: HttpClient) {}

  onBtnClick(): void {
    this.isHighlighted = !this.isHighlighted;
    this.action.emit(this.isHighlighted);
    this.loadData();
  }

  loadData() {
    this.httpClient
      .get<EventDateSearchResponse>('https://oveda.de/api/v1/organizations/2/event-dates/search')
      .subscribe((data) => {
        this.response = data;
        console.log(this.response);
      });
  }
}
