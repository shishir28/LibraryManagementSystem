import { ChangeDetectionStrategy, Component, Directive, Input, ViewEncapsulation } from '@angular/core';

// noinspection TsLint
@Component({
  selector: 'lms-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  host: { 'class': 'lms-card' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FuryCard {
}

// noinspection TsLint
@Component({
  selector: 'lms-card-header',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'lms-card-header' },
  template: `
    <div class="lms-card-header-title-group">
      <ng-content select="lms-card-header-title"></ng-content>
      <ng-content select="lms-card-header-sub-title"></ng-content>
    </div>
    <ng-content></ng-content>
    <ng-content select="lms-card-header-actions"></ng-content>
  `
})
export class FuryCardHeader {
}

// noinspection TsLint
@Component({
  selector: 'lms-card-content',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'lms-card-content' },
  template: `
    <ng-content></ng-content>`
})
export class FuryCardContent {
}

// noinspection TsLint
@Directive({
  selector: 'lms-card-header-title',
  host: { 'class': 'lms-card-header-title' }
})
export class FuryCardHeaderTitle {
}

// noinspection TsLint
@Directive({
  selector: 'lms-card-header-sub-title',
  host: { 'class': 'lms-card-header-sub-title' }
})
export class FuryCardHeaderSubTitle {
}

// noinspection TsLint
@Directive({
  selector: 'lms-card-header-actions',
  host: { 'class': 'lms-card-header-actions' }
})
export class FuryCardHeaderActions {
}

// noinspection TsLint
@Directive({
  selector: 'lms-card-actions',
  host: {
    'class': 'lms-card-actions',
    '[class.lms-card-actions-align-end]': 'align === "end"',
  }
})
export class FuryCardActions {
  /** Position of the actions inside the card. */
  @Input() align: 'start' | 'end' = 'start';
}
