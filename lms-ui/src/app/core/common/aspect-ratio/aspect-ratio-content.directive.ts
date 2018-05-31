import { Directive } from '@angular/core';

@Directive({
  selector: '[furyAspectRatioContent]',
  host: { '[class.lms-aspect-ratio-content-element]': 'true' }
})
export class AspectRatioContentDirective {

  constructor() {
  }

}
