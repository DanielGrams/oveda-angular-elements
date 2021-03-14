import { DoBootstrap, Injector, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { OrganizationLandingPageComponent } from './organization-landing-page/organization-landing-page.component';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiModule, BASE_PATH } from '@oveda/oveda-api';
import { AddressPipe } from './pipes';
import { WarningPillsComponent } from './warning-pills/warning-pills.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [OrganizationLandingPageComponent, AppComponent, AddressPipe, WarningPillsComponent],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, ApiModule, NgbPaginationModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'de' },
    { provide: BASE_PATH, useValue: 'https://oveda.de' },
  ],
  entryComponents: [OrganizationLandingPageComponent],
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {
    const customElement = createCustomElement(OrganizationLandingPageComponent, { injector: this.injector });
    customElements.define('organization-landing-page', customElement);
  }

  ngDoBootstrap() {}
}
