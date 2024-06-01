import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseLocation',
})
export class ParseLocationPipe implements PipeTransform {
  transform(value: [number, number]): string {
    if (
      !value ||
      value.length !== 2 ||
      typeof value[0] !== 'number' ||
      typeof value[1] !== 'number'
    ) {
      return '';
    }
    
    const [latitude, longitude] = value;
    const latDirection = latitude < 0 ? 'S' : 'N';
    const laVal = Math.abs(latitude).toFixed(2);

    const lonDirection = longitude < 0 ? 'W' : 'E';
    const lonVal = Math.abs(longitude).toFixed(2);

    return `${laVal}${latDirection} ${lonVal}${lonDirection}`;
  }
}
