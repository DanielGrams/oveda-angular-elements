import { Injector, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { OrganizationLandingPageComponent } from './organization-landing-page/organization-landing-page.component';
import { createCustomElement } from '@angular/elements';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { getGermanPaginatorIntl } from './german-paginator-intl';
import { ApiModule, BASE_PATH } from '@oveda/oveda-api';

@NgModule({
  declarations: [OrganizationLandingPageComponent, AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatProgressBarModule,
    ApiModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de' },
    { provide: MatPaginatorIntl, useValue: getGermanPaginatorIntl() },
    { provide: BASE_PATH, useValue: 'https://oveda.de' },
  ],
  bootstrap: [AppComponent],
  // entryComponents: [OrganizationLandingPageComponent],
})
export class AppModule {
  // https://medium.com/comsystoreply/angular-elements-569025b65c69
  // constructor(private injector: Injector) {}
  // ngDoBootstrap() {
  //   const customElement = createCustomElement(OrganizationLandingPageComponent, { injector: this.injector });
  //   customElements.define('organization-landing-page', customElement);
  // }
}
