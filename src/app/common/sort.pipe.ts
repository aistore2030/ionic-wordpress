import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(data: any[], args?: any): any[] {
    data.sort((a: any, b: any) => {
      if (a.orderIndex < b.orderIndex) {
        return -1;
      } else if (a.orderIndex > b.orderIndex) {
        return 1;
      } else {
        return 0;
      }
    });
    return data;
  }
}
