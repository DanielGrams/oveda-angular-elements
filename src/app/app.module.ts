import { DoBootstrap, Injector, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { OrganizationLandingPageComponent } from './organization-landing-page/organization-landing-page.component';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiModule } from '@oveda/oveda-api';
import { AddressPipe } from './pipes';
import { WarningPillsComponent } from './warning-pills/warning-pills.component';
import { NgbPaginationModule, NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';
import { EventDateSearchComponent } from './event-date-search/event-date-search.component';
import { FormsModule } from '@angular/forms';
import { DateFilterComponent } from './shared/date-filter/date-filter.component';

@NgModule({
  declarations: [
    OrganizationLandingPageComponent,
    AppComponent,
    AddressPipe,
    WarningPillsComponent,
    EventDateSearchComponent,
    DateFilterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ApiModule,
    FormsModule,
    NgbPaginationModule,
    NgbButtonsModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de' }],
  entryComponents: [OrganizationLandingPageComponent, EventDateSearchComponent],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
    const organizationLandingPage = createCustomElement(OrganizationLandingPageComponent, { injector: this.injector });
    customElements.define('organization-landing-page', organizationLandingPage);

    const eventDateSearch = createCustomElement(EventDateSearchComponent, { injector: this.injector });
    customElements.define('event-date-search', eventDateSearch);
  }

  ngDoBootstrap() {}
}
