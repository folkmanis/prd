import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText'
})
export class ShortenTextPipe implements PipeTransform {

  transform(value: string, len: number = 100): string {

    if (typeof value !== 'string') { throw Error('Invalid Argument'); }
    if (len < 1) { return ''; }

    value = value.trim();
    if (value.length <= len - 3) { return value; }
    if (value.length === 3 && len === 3) { return value; }
    if (len <= 3) { return '.'.repeat(len); }
    return value.length > len ? value.slice(0, len - 3) + '...' : value;
  }

}
