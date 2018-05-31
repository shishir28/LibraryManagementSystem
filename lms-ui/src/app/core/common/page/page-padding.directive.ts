import { Directive } from '@angular/core';

@Directive({
  selector: '[furyPagePadding]',
  host: { 'class': 'lms-page-padding' }
})
export class PagePaddingDirective {

  constructor() {
  }

}
