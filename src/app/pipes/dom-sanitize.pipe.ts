import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'domSanitize'
})
export class DomSanitizePipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer) { }

  transform(value: any): any {
    const url = environment.video_url;
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url + value);
  }

}
