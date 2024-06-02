import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseLastDate',
})
export class ParseLastDatePipe implements PipeTransform {
  transform(value: string[]): string {
    if (!Array.isArray(value) || value?.length < 1) {
      return '--';
    }

    const lastUpdateDate = value[value.length - 1].replace('T', ' ');

    return lastUpdateDate;
  }
}
