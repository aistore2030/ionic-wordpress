import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment/min/moment-with-locales';
import * as hijri from 'moment-hijri';


@Pipe({
  name: 'moment'
})
export class MomentPipe implements PipeTransform {
  transform(date: any, args?: any): any {
    if (args === 'full') {
      return moment(date).format('dddd, D MMMM YYYY, h:mm a');
    }
    if (args === 'simple') {
      return `${moment(date).format('D.MM.YYYY')}`;
    }

    if (args === 'hijri') {
      const h = `${hijri(date).format('iD iMMMM iYYYY')}`;
      const numberMap = {
        '١': '1',
        '٢': '2',
        '٣': '3',
        '٤': '4',
        '٥': '5',
        '٦': '6',
        '٧': '7',
        '٨': '8',
        '٩': '9',
        '٠': '0'
      };
      return h.toString().replace(/[١٢٣٤٥٦٧٨٩٠]/g, function (match) {
        return numberMap[match];
      });
    }

    return moment(date).fromNow();

  }
}
