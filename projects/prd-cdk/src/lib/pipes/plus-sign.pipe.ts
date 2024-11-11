import { Pipe, PipeTransform } from '@angular/core';

const toPlusString = (value: number): string =>
  value > 0 ? `+${value}` : value.toString();

@Pipe({
  name: 'plusSign',
  standalone: true,
})
export class PlusSignPipe implements PipeTransform {
  transform(value: unknown): unknown {
    if (typeof value === 'number' && !isNaN(value)) {
      return toPlusString(value);
    }
    if (typeof value === 'string' && value.trim() !== '' && !isNaN(+value)) {
      return toPlusString(+value);
    }
    return value;
  }
}
