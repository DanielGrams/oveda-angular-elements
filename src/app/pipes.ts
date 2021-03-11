import { Pipe, PipeTransform } from '@angular/core';
import { Location } from '@oveda/oveda-api/model/location';

@Pipe({
  name: 'address',
})
export class AddressPipe implements PipeTransform {
  transform(location: Location, args?: any): any {
    if (location.street) {
      return location.street + ', ' + location.postalCode + ' ' + location.city;
    }

    return location.postalCode + ' ' + location.city;
  }
}
