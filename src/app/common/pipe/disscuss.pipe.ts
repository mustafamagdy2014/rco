import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'disscuss'
})
export class DisscussPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value!=undefined){
      if(value==0)return "لا";
      else return "نعم";
    }
    return "undefined!!";
  }

}
