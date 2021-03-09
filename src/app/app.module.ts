import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { OrganizationLandingPageComponent } from './organization-landing-page/organization-landing-page.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [OrganizationLandingPageComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [OrganizationLandingPageComponent],
  // entryComponents: [OrganizationLandingPageComponent]
})
export class AppModule {
  // https://medium.com/comsystoreply/angular-elements-569025b65c69
  // constructor(private injector: Injector) {}
  // ngDoBootstrap() {
  //   const customElement = createCustomElement(
  //     OrganizationLandingPageComponent, {injector: this.injector});
  //   customElements.define('organization-landing-page', customElement);
  // }
}
