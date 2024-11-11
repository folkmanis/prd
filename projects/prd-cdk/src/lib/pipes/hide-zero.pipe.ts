import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideZero',
  standalone: true,
})
export class HideZeroPipe implements PipeTransform {
  transform(value: unknown): unknown {
    if (value === 0 || value === '0') {
      return '';
    }
    return value;
  }
}
