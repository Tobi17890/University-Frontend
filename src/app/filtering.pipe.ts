import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtering'
})
export class FilteringPipe implements PipeTransform {

  transform( value: any[], filterString: string, propName: string ): any[] {
    const resultArray: any =[];
    if(!value || filterString === '' || propName === ''){
      return value;
    }
    value.forEach((a: any) => {
      if( a[propName].trim().toLowerCase().includes(filterString.toLowerCase())){
        resultArray.push(a);
      }
    });
    return resultArray;
  }

}
