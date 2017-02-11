import {Pipe} from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe {
  transform(text,args) {
    console.log('TruncatePipe.args: ' + args);
    return text.substr(0,args);
  }
}