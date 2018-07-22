import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberSuffex'
})
export class NumberSuffexPipe implements PipeTransform {
   singleTask:string=" مهمه" ; 
   multipleTasks:string=" مهام";
  transform(value: any, args?: any): any {
    let result=value;
    if(value!=null){
      if(value<=1){
        result+=this.singleTask;
      }else{
        result+=this.multipleTasks;
      }
    }
    return result;
  }

}
