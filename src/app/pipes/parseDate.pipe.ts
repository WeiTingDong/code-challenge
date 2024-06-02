import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseDate',
})
export class ParseDatePipe implements PipeTransform {
  transform(value: string[]): string[] {
    if (!Array.isArray(value) || !value?.length) {
      return [];
    }

    return value.map((t) => t.split('T')[1]);
  }
}
