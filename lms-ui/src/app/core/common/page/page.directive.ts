import { Directive } from '@angular/core';

@Directive({
  selector: '[furyPage]',
  host: { 'class': 'lms-page' }
})
export class PageDirective {

  constructor() {
  }

}
