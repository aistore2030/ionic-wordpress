import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(data: any[], args?: any): any[] {
    debugger
    data.sort((a: any, b: any) => {
      console.log(a);
      if (a.orderIndex < b.orderIndex) {
        return -1;
      } else if (a.orderIndex > b.orderIndex) {
        return 1;
      } else {
        return 0;
      }
    });
    console.log(data);

    return data;
  }
}
