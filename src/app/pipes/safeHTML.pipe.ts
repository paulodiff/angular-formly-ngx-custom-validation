// permette di sanitizzare le immagini base64
// ed evitare il warning
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'safeHtml'})

export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(html) {
    // return this.sanitizer.bypassSecurityTrustHtml(html);
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }
}