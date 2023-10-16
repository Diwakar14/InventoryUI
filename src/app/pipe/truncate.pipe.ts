import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, ...args: any[]) {
    if (value == null) return '';
    return args[0] < value?.length - 1
      ? value.substring(0, args[0]) + '...'
      : value.substring(0, args[0]);
  }
}
