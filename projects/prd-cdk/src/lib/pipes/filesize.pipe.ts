import { Pipe, PipeTransform } from '@angular/core';
import * as fs from 'filesize';

@Pipe({
  name: 'filesize'
})
export class FilesizePipe implements PipeTransform {
  /**
   * Transforms number of bytes to human readable string
   *
   * @param value numerical value in bytes
   * @param options refer to https://filesizejs.com/
   */
  transform(value: number, options?: any): string | null {
    if (isNaN(+value)) { return null; }
    return fs(value, options);
  }

}
